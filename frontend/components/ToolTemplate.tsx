'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, Sun, Moon } from 'lucide-react';
import { ToolSidebar } from './ToolSidebar';

interface ToolTemplateProps {
  title: string;
  description: string;
  icon?: string;
  onReset?: () => void;
  children: React.ReactNode;
}

export function ToolCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="border border-border bg-secondary-bg p-4">
      {title && (
        <h3 className="text-sm font-bold text-accent mb-3 uppercase tracking-wider"># {title}</h3>
      )}
      {children}
    </div>
  );
}

export function InputGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export function OutputGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tinkr-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : systemDark;
    applyTheme(shouldBeDark);
    setIsDark(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');

    if (dark) {
      html.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('tinkr-theme', 'dark');
    } else {
      html.classList.add('light');
      body.classList.add('light');
      localStorage.setItem('tinkr-theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    applyTheme(newIsDark);
    setIsDark(newIsDark);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="px-2.5 py-1 text-xs text-muted-foreground hover:text-accent transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      [{isDark ? 'light' : 'dark'}]
    </button>
  );
}

export default function ToolTemplate({
  title,
  description,
  icon = '⚙️',
  onReset,
  children,
}: ToolTemplateProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Only hide header on larger screens (lg+), always show on mobile
    if (isMobile) {
      setIsHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header on desktop when scrolling down more than 50px
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide header
          setIsHeaderVisible(false);
        } else {
          // Scrolling up - show header
          setIsHeaderVisible(true);
        }
      } else {
        // Always show header at top
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex lg:pl-56">
        <ToolSidebar />
        <div className="flex-1 flex flex-col w-full">
          <div className="pt-32 sm:pt-28 lg:pt-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex lg:pl-56" suppressHydrationWarning>
      {/* Sidebar */}
      <ToolSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header - Always visible on mobile, hide-on-scroll on desktop */}
        <header className={`fixed top-0 right-0 left-0 lg:left-56 z-40 border-b border-border bg-background transition-all duration-200 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
        }`}>
          <div className="px-4 py-2 flex items-center justify-between gap-4" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs min-w-0 flex-1">
              <span style={{ color: 'var(--accent)' }}>❯</span>
              <Link href="/" className="hover:no-underline transition-colors" style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >jabir@tinkr</Link>
              <span style={{ color: 'var(--muted)' }}>›</span>
              <span className="shrink-0">{icon}</span>
              <span className="font-semibold truncate" style={{ color: 'var(--foreground)' }}>{title}</span>
              <span className="hidden sm:block truncate ml-1 italic" style={{ color: 'var(--muted-foreground)' }}>— {description}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0 shrink-0 border border-border">
              <ThemeToggle />
              <Link
                href="/"
                className="px-2.5 py-1 text-xs text-muted-foreground hover:text-accent border-l border-border transition-colors hover:no-underline"
                title="Back to home"
              >
                [home]
              </Link>
              {onReset && (
                <button
                  onClick={onReset}
                  className="px-2.5 py-1 text-xs text-muted-foreground hover:text-accent border-l border-border transition-colors"
                  title="Reset"
                >
                  [reset]
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 w-full pt-20 lg:pt-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background py-3 mt-8">
          <div className="px-4 text-xs text-muted-foreground">
            <span className="text-accent">$</span> tinkr — part of <a href="/" className="text-accent hover:underline">tinkr.dev</a> · made by <a href="https://github.com/Jabir-Srj/tinkr" className="text-accent hover:underline">jabir</a>
          </div>
        </footer>
      </div>


    </div>
  );
}
