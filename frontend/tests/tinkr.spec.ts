import { test, expect } from '@playwright/test';

test.describe('Tinkr - Web Tools Collection', () => {
  const BASE_URL = 'http://localhost:3001';

  test.describe('Landing Page', () => {
    test('should display the landing page', async ({ page }) => {
      await page.goto(BASE_URL);
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should show Tinkr branding with Claude theme', async ({ page }) => {
      await page.goto(BASE_URL);
      const logo = page.locator('svg').first();
      await expect(logo).toBeVisible();
    });

    test('should have search functionality', async ({ page }) => {
      await page.goto(BASE_URL + '#tools');
      const searchBox = page.locator('input[placeholder="Search tools..."]');
      await expect(searchBox).toBeVisible();
    });
  });

  test.describe('Text Tools', () => {
    test('text tools page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/text');
      await expect(page.locator('text=Text Tools')).toBeVisible();
    });

    test('text transformation works', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/text');
      const textarea = page.locator('textarea').first();
      await textarea.fill('hello world');
      await page.locator('button:has-text("UPPER")').click();
      await page.waitForTimeout(300);
      const content = await page.content();
      expect(content).toContain('hello world');
    });
  });

  test.describe('UUID Generator', () => {
    test('UUID generator page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/uuid');
      await expect(page.locator('text=UUID Generator')).toBeVisible();
    });

    test('UUID generation works', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/uuid');
      const button = page.locator('button:has-text("Generate")');
      await button.click();
      await page.waitForTimeout(500);
      const uuids = page.locator('code');
      const count = await uuids.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('JSON Formatter', () => {
    test('JSON formatter page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/json');
      await expect(page.locator('text=JSON Formatter')).toBeVisible();
    });

    test('JSON formatting works', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/json');
      const input = page.locator('textarea').first();
      await input.fill('{"name":"John","age":30}');
      await page.locator('button:has-text("Format")').click();
      await page.waitForTimeout(300);
      const content = await page.content();
      expect(content).toContain('name');
    });
  });

  test.describe('Base64 Encoder', () => {
    test('Base64 encoder page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/base64');
      await expect(page.locator('text=Base64 Encoder')).toBeVisible();
    });

    test('Base64 encoding works', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/base64');
      const button = page.locator('button:has-text("Encode")');
      await button.click();
      await page.waitForTimeout(300);
      const content = await page.content();
      expect(content).toBeTruthy();
    });
  });

  test.describe('Password Checker', () => {
    test('password checker page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/password');
      await expect(page.locator('text=Password Strength Checker')).toBeVisible();
    });

    test('password strength meter appears on input', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/password');
      const input = page.locator('input[type="password"]');
      await input.fill('TestPassword123!');
      await page.waitForTimeout(300);
      const strength = page.locator('text=Strong');
      await expect(strength).toBeVisible();
    });
  });

  test.describe('Scientific Calculator', () => {
    test('calculator page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/scientific');
      const title = page.locator('text=Scientific Calculator');
      await expect(title).toBeVisible();
    });

    test('calculator has buttons', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/scientific');
      const buttons = page.locator('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(10);
    });

    test('calculator has scientific functions', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/scientific');
      await expect(page.locator('button:has-text("sin")')).toBeVisible();
      await expect(page.locator('button:has-text("cos")')).toBeVisible();
      await expect(page.locator('button:has-text("sqrt")')).toBeVisible();
    });
  });

  test.describe('Base Converter', () => {
    test('converter page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/base');
      const title = page.locator('text=Base Converter');
      await expect(title).toBeVisible();
    });

    test('converter has all input fields', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/base');
      const inputs = page.locator('input');
      const count = await inputs.count();
      expect(count).toBe(4);
    });

    test('converter shows default values', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/base');
      const inputs = page.locator('input');
      expect(await inputs.nth(0).inputValue()).toBe('255');
      expect(await inputs.nth(1).inputValue()).toBe('FF');
      expect(await inputs.nth(2).inputValue()).toBe('11111111');
      expect(await inputs.nth(3).inputValue()).toBe('377');
    });
  });

  test.describe('Unit Converter', () => {
    test('converter page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/units');
      const title = page.locator('text=Unit Converter');
      await expect(title).toBeVisible();
    });

    test('converter has category buttons', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/calculator/units');
      const buttons = page.locator('button').first();
      await expect(buttons).toBeVisible();
    });
  });

  test.describe('Color Converter Pro', () => {
    test('color converter page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/color/converter');
      const title = page.locator('text=Color Converter Pro');
      await expect(title).toBeVisible();
    });

    test('color preview renders', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/color/converter');
      const page_content = await page.content();
      expect(page_content).toContain('#FF6B35');
    });

    test('RGB values display correctly', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/color/converter');
      const inputs = page.locator('input[type="number"]');
      expect(await inputs.nth(0).inputValue()).toBe('255');
      expect(await inputs.nth(1).inputValue()).toBe('107');
      expect(await inputs.nth(2).inputValue()).toBe('53');
    });
  });

  test.describe('Word Counter', () => {
    test('word counter page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/typography/word-count');
      const title = page.locator('text=Word Counter');
      await expect(title).toBeVisible();
    });

    test('word counter has textarea', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/typography/word-count');
      const textarea = page.locator('textarea');
      await expect(textarea).toBeVisible();
    });

    test('word counter calculates stats', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/typography/word-count');
      const content = await page.content();
      expect(content).toContain('Words');
      expect(content).toContain('Characters');
    });
  });

  test.describe('QR Code Generator', () => {
    test('QR generator page loads', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/misc/qr');
      const title = page.locator('text=QR Code Generator');
      await expect(title).toBeVisible();
    });

    test('QR generator has textarea', async ({ page }) => {
      await page.goto(BASE_URL + '/tools/misc/qr');
      const textarea = page.locator('textarea');
      await expect(textarea).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('calculator works on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL + '/tools/calculator/scientific');
      await expect(page.locator('text=Scientific Calculator')).toBeVisible();
    });

    test('converter works on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(BASE_URL + '/tools/calculator/base');
      await expect(page.locator('text=Base Converter')).toBeVisible();
    });

    test('color converter works on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(BASE_URL + '/tools/color/converter');
      await expect(page.locator('text=Color Converter Pro')).toBeVisible();
    });
  });

  test.describe('Claude Theme', () => {
    test('landing page has Claude theme colors', async ({ page }) => {
      await page.goto(BASE_URL);
      const content = await page.content();
      expect(content).toContain('tinkr');
    });

    test('all tools have consistent styling', async ({ page }) => {
      const tools = [
        '/tools/text',
        '/tools/uuid',
        '/tools/json',
        '/tools/base64',
        '/tools/password',
      ];

      for (const tool of tools) {
        await page.goto(BASE_URL + tool);
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
      }
    });
  });

  test.describe('Performance', () => {
    test('landing page loads quickly', async ({ page }) => {
      const start = Date.now();
      await page.goto(BASE_URL);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(5000);
    });

    test('tools load quickly', async ({ page }) => {
      const start = Date.now();
      await page.goto(BASE_URL + '/tools/calculator/scientific');
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(3000);
    });
  });
});
