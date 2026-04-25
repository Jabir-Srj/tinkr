'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/theme-provider';
import { tools, categories, stats } from '@/lib/tools';

/* ── Animated counter ─────────────────────────────────────── */
function Counter({ to }: { to: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      started.current = true;
      obs.disconnect();
      const dur = 1000;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setCount(Math.round((1 - Math.pow(2, -8 * p)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{count}</span>;
}

/* ── Theme toggle ─────────────────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="opacity-0 text-xs">-----</span>;
  return (
    <button
      onClick={toggleTheme}
      className="text-xs px-2 py-0.5 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
      aria-label="Toggle theme"
    >
      [{theme === 'dark' ? 'light' : 'dark'}]
    </button>
  );
}

/* ── Typewriter line ──────────────────────────────────────── */
function TypeLine({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, 28);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, onDone]);

  return (
    <span>
      {displayed}
      {!done && <span className="cursor-blink" />}
    </span>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [filtered, setFiltered] = useState(tools);
  const [mounted, setMounted] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    
    if (cmd === '/tools' || cmd === 'tinkr --list' || cmd === 'browse_tools()') {
      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === '/about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === '/github') {
      window.open('https://github.com/Jabir-Srj/tinkr', '_blank');
    } else if (cmd === '/search') {
      searchRef.current?.focus();
      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
    }
    setTerminalInput('');
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let result = tools;
    if (category !== 'all') result = result.filter(t => t.category === category);
    if (query) result = result.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, category]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
        document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!mounted) return null;

  const activeCat = categories.find(c => c.value === category);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--background)',
        backgroundImage: 'radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 50%)',
      }}
    >
      {/* ── Topbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-bold hover:no-underline" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--muted-foreground)' }}>~</span>
            <span>jabir@tinkr</span>
            <span style={{ color: 'var(--muted-foreground)' }} className="font-normal">/tools</span>
          </a>

          <nav className="hidden md:flex items-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {[
              { label: '/about', href: '#about' },
              { label: '/tools', href: '#tools' },
              { label: '/github', href: 'https://github.com/Jabir-Srj/tinkr' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-3 py-1 transition-colors border-r border-border first:border-l hover:no-underline"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                {label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* ── Hero — macOS terminal window ─────────────────── */}
      <section className="px-4 py-10 md:py-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="terminal-window w-full max-w-3xl"
          style={{ borderRadius: '8px !important' }}
        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <div className="terminal-traffic-lights">
              <span className="tl-dot tl-red" />
              <span className="tl-dot tl-yellow" />
              <span className="tl-dot tl-green" />
            </div>
            <span className="terminal-title">jabir@tinkr ~ /tools</span>
          </div>

          {/* Terminal body */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-1 text-sm" style={{ backgroundColor: 'var(--background)' }}>
            {/* Welcome */}
            <div style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
              # tinkr v2.0 — fast, minimal developer tools
            </div>
            <div style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
              # no logins. no tracking. no BS.
            </div>
            <div className="pt-1" />

            {/* Commands */}
            <div>
              <span style={{ color: 'var(--accent)' }}>❯ </span>
              <span style={{ color: 'var(--foreground)' }}>tinkr --list | wc -l</span>
            </div>
            <div style={{ color: 'var(--foreground)' }} className="pl-4">
              <Counter to={stats.total} />
              <span style={{ color: 'var(--muted-foreground)' }}> tools available</span>
            </div>

            <div className="pt-1">
              <span style={{ color: 'var(--accent)' }}>❯ </span>
              <span style={{ color: 'var(--foreground)' }}>tinkr --status</span>
            </div>
            <div className="pl-4 space-y-0.5">
              {[
                ['OK', 'privacy-first — zero data collection, no servers'],
                ['OK', 'client-side — all processing in your browser'],
                ['OK', 'cost — $0.00 forever'],
                ['OK', `tools — ${stats.total} utilities across ${stats.categories} categories`],
              ].map(([tag, msg]) => (
                <div key={msg}>
                  <span style={{ color: 'var(--accent)' }}>[{tag}]</span>
                  <span style={{ color: 'var(--muted-foreground)' }}> {msg}</span>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <span style={{ color: 'var(--accent)' }}>❯ </span>
              <span style={{ color: 'var(--foreground)' }}>tinkr --help</span>
            </div>
            <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {[
                ['/tools', 'browse all tools'],
                ['/about', 'about this project'],
                ['/search', 'search by keyword (press /)'],
                ['/github', 'view source code'],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-2">
                  <span style={{ color: 'var(--accent)' }}>{cmd}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            {/* Input line */}
            <div className="pt-3 border-t border-dashed mt-2 flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
              <span className="font-bold shrink-0" style={{ color: 'var(--accent)' }}>❯</span>
              <form onSubmit={handleTerminalSubmit} className="flex-1 flex items-center">
                <input
                  type="text"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder='try "/tools" or "/about"'
                  className="bg-transparent border-none p-0 w-full focus:outline-none focus:ring-0"
                  style={{ color: 'var(--foreground)', boxShadow: 'none' }}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <span className="ml-auto flex gap-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <a href="#tools" className="hover:no-underline" style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  /tools ↓
                </a>
                <a href="https://github.com/Jabir-Srj/tinkr" target="_blank" rel="noopener noreferrer"
                  className="hover:no-underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  /github ↗
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Tools Section ────────────────────────────────── */}
      <section id="tools" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 py-8 space-y-5">

          {/* Section header */}
          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--accent)' }}>❯</span>
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>tinkr --list</span>
            <div className="flex-1 border-t border-dashed ml-2" style={{ borderColor: 'var(--border)' }} />
          </div>

          {/* Search */}
          <div
            className="flex items-center border transition-colors"
            style={{ borderColor: 'var(--border)' }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span className="px-3 py-2.5 border-r text-sm font-bold" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>❯</span>
            <input
              ref={searchRef}
              id="search-tools"
              type="search"
              placeholder="filter tools..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
              style={{ boxShadow: 'none', border: 'none', color: 'var(--foreground)' }}
            />
            <kbd className="hidden sm:block px-3 py-2.5 border-l text-xs italic" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>press /</kbd>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-0 border-b" style={{ borderColor: 'var(--border)' }}>
            {categories.map(cat => {
              const active = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className="px-3 py-1.5 text-xs border-r transition-colors last:border-r-0"
                  style={active
                    ? { backgroundColor: 'var(--accent)', color: 'var(--background)', borderColor: 'var(--accent)', fontWeight: '600' }
                    : { backgroundColor: 'transparent', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                  }
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <span style={{ color: 'var(--accent)' }}>❯</span>{' '}
            found <span style={{ color: 'var(--foreground)' }}>{filtered.length}</span> tools
            {category !== 'all' && <> in <span style={{ color: 'var(--accent)' }}>{activeCat?.name}</span></>}
            {query && <> matching <span style={{ color: 'var(--foreground)' }}>"{query}"</span></>}
          </div>

          {/* Tool grid */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l"
            style={{ borderColor: 'var(--border)' }}
          >
            {filtered.map((tool, i) => (
              <motion.a
                key={tool.url}
                href={tool.url}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: Math.min(i * 0.015, 0.25), duration: 0.3 }}
                className="group block p-4 border-b border-r transition-colors cursor-pointer"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--secondary-bg)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-base">{tool.emoji}</span>
                  <span
                    className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                    style={{ color: 'var(--accent)' }}
                  >→</span>
                </div>
                <div
                  className="text-xs font-semibold mb-1 transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={e => ((e.currentTarget.parentElement as HTMLElement).querySelector('.tool-name')?.setAttribute('style', `color:var(--accent)`))}
                >
                  <span className="tool-name">{tool.name}</span>
                </div>
                <div className="text-xs line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                  {tool.description}
                </div>
              </motion.a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-10 text-sm border p-5" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
              <div><span style={{ color: 'var(--accent)' }}>❯</span> search "{query}"</div>
              <div className="pl-4 mt-1 italic">no results found — try a different query</div>
            </div>
          )}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section id="about" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="space-y-5 max-w-2xl text-sm">
            <div className="flex items-center gap-3">
              <span style={{ color: 'var(--accent)' }}>❯</span>
              <span style={{ color: 'var(--foreground)' }}>cat README.md</span>
              <div className="flex-1 border-t border-dashed ml-2" style={{ borderColor: 'var(--border)' }} />
            </div>

            <div style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
              {/* README content */}
              <div># About Tinkr</div>
              <div className="mt-2" style={{ fontStyle: 'normal', color: 'var(--foreground)' }}>
                A collection of fast, minimal developer tools. No tracking. No logins.
                No servers. Everything runs in your browser — your data stays yours.
              </div>
            </div>

            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--accent)' }}>
              {[
                ['privacy', 'zero data collection. no cookies, no analytics'],
                ['speed', 'instant results — pure client-side processing'],
                ['open', 'MIT license — fork it, improve it, share it'],
                ['free', '$0.00 forever. no pricing tiers'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 text-xs">
                  <span className="shrink-0" style={{ color: 'var(--accent)' }}>{k}:</span>
                  <span style={{ color: 'var(--muted-foreground)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <span>
            <span style={{ color: 'var(--accent)' }}>jabir@tinkr</span>
            {' '}~ /tools — v2.0 — MIT license
          </span>
          <span className="italic">
            ... type <span style={{ color: 'var(--accent)' }}>/help</span> for all commands
          </span>
        </div>
      </footer>
    </div>
  );
}
