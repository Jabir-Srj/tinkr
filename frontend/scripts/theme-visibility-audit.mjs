import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const FRONTEND_ROOT = process.cwd();
const APP_TOOLS_DIR = path.join(FRONTEND_ROOT, 'app', 'tools');
const BASE_URL = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const THEMES = ['light', 'dark'];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function routeFromPageFile(filePath) {
  const rel = path.relative(path.join(FRONTEND_ROOT, 'app'), filePath).replaceAll('\\', '/');
  return `/${rel.replace(/\/page\.tsx$/, '')}`;
}

async function getToolRoutes() {
  const files = await walk(APP_TOOLS_DIR);
  return files
    .filter((f) => f.endsWith(`${path.sep}page.tsx`))
    .map(routeFromPageFile)
    .sort((a, b) => a.localeCompare(b));
}

function toCssPath(el) {
  if (!el || !el.tagName) return 'unknown';
  let curr = el;
  const parts = [];
  while (curr && curr.nodeType === 1 && parts.length < 4) {
    const tag = curr.tagName.toLowerCase();
    const className = (curr.className || '')
      .toString()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join('.');
    parts.unshift(className ? `${tag}.${className}` : tag);
    curr = curr.parentElement;
  }
  return parts.join(' > ');
}

function luminance(rgb) {
  const s = [rgb.r, rgb.g, rgb.b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}

function contrastRatio(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

function parseRgb(colorString) {
  if (!colorString) return null;
  const m = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return null;
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
}

function isTransparent(colorString) {
  if (!colorString) return true;
  return colorString === 'transparent' || colorString === 'rgba(0, 0, 0, 0)';
}

async function auditTheme(page, route, theme) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t) => {
    localStorage.setItem('tinkr-theme', t);
    document.documentElement.classList.remove('dark', 'light');
    document.body.classList.remove('dark', 'light');
    document.documentElement.classList.add(t);
    document.body.classList.add(t);
  }, theme);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(150);

  const issues = await page.evaluate(() => {
    const textSelectors = [
      'p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'code', 'pre', 'li', 'td', 'th', 'small', 'strong',
      'input', 'textarea', 'select'
    ].join(',');
    const nodes = Array.from(document.querySelectorAll(textSelectors));
    const findings = [];

    function isTransparent(colorString) {
      if (!colorString) return true;
      return colorString === 'transparent' || colorString === 'rgba(0, 0, 0, 0)';
    }

    function parseRgb(colorString) {
      if (!colorString) return null;
      const m = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return null;
      return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
    }

    function luminance(rgb) {
      const s = [rgb.r, rgb.g, rgb.b].map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
    }

    function contrastRatio(a, b) {
      const l1 = luminance(a);
      const l2 = luminance(b);
      const light = Math.max(l1, l2);
      const dark = Math.min(l1, l2);
      return (light + 0.05) / (dark + 0.05);
    }

    function toCssPath(el) {
      if (!el || !el.tagName) return 'unknown';
      let curr = el;
      const parts = [];
      while (curr && curr.nodeType === 1 && parts.length < 4) {
        const tag = curr.tagName.toLowerCase();
        const className = (curr.className || '')
          .toString()
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .join('.');
        parts.unshift(className ? `${tag}.${className}` : tag);
        curr = curr.parentElement;
      }
      return parts.join(' > ');
    }

    function nearestBg(el) {
      let curr = el;
      while (curr) {
        const bg = getComputedStyle(curr).backgroundColor;
        if (!isTransparent(bg)) return bg;
        curr = curr.parentElement;
      }
      return getComputedStyle(document.body).backgroundColor;
    }

    for (const el of nodes) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const text = (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)
        ? (el.value || el.placeholder || '')
        : (el.textContent || '');
      if (!text.trim()) continue;
      if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) < 0.8) continue;
      if (rect.width < 8 || rect.height < 8) continue;

      const fg = parseRgb(style.color);
      const bg = parseRgb(nearestBg(el));
      if (!fg || !bg) continue;
      const ratio = contrastRatio(fg, bg);
      const inSidebar = !!el.closest('aside');
      const shortDecorative = text.trim().length <= 2;
      const ancestorWithImageBg = el.closest('*');
      let hasImageBackground = false;
      let scan = ancestorWithImageBg;
      while (scan) {
        const bgImage = getComputedStyle(scan).backgroundImage;
        if (bgImage && bgImage !== 'none') {
          hasImageBackground = true;
          break;
        }
        scan = scan.parentElement;
      }
      if (ratio < 2 && !inSidebar && !shortDecorative && !hasImageBackground) {
        findings.push({
          text: text.trim().slice(0, 60),
          ratio: Number(ratio.toFixed(2)),
          path: toCssPath(el),
          fg: style.color,
          bg: nearestBg(el),
        });
      }
      if (findings.length >= 12) break;
    }
    return findings;
  });

  return issues;
}

async function main() {
  const routes = await getToolRoutes();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];

  for (const route of routes) {
    for (const theme of THEMES) {
      try {
        const issues = await auditTheme(page, route, theme);
        if (issues.length) failures.push({ route, theme, issues });
      } catch (err) {
        failures.push({
          route,
          theme,
          issues: [{ text: `Audit error: ${String(err)}`, ratio: 0, path: 'navigation', fg: '', bg: '' }],
        });
      }
    }
  }

  await browser.close();

  console.log(JSON.stringify({
    baseUrl: BASE_URL,
    totalRoutes: routes.length,
    checkedThemes: THEMES.length,
    failureCount: failures.length,
    failures,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
