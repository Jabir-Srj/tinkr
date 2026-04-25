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
    <div className="rounded-lg border border-border bg-secondary-bg p-6 shadow-sm hover:shadow-md transition-shadow">
      {title && (
        <h3 className="text-base font-semibold text-foreground mb-4">{title}</h3>
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
      className="p-2 rounded-lg border border-border bg-secondary-bg hover:bg-border text-foreground transition-colors flex items-center gap-2"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm font-medium hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
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
        <header className={`fixed top-0 right-0 left-0 lg:left-56 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300 ease-out ${
          isHeaderVisible ? 'translate-y-0 lg:translate-y-0' : '-translate-y-full lg:translate-y-0'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Link
                href="/"
                className="p-2 rounded-lg border border-border bg-secondary-bg hover:bg-border text-foreground transition-colors flex items-center gap-2"
                title="Back to home"
              >
                <Home size={18} />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </Link>
              
              {onReset && (
                <button
                  onClick={onReset}
                  className="p-2 rounded-lg border border-border bg-secondary-bg hover:bg-border text-foreground transition-colors flex items-center gap-2"
                  title="Reset to defaults"
                >
                  <RotateCcw size={18} />
                  <span className="text-sm font-medium hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content - Add top padding for fixed header */}
        <main className="max-w-7xl mx-auto px-6 py-12 w-full pt-32 sm:pt-28 lg:pt-24">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-secondary-bg py-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>Made with ❤️ by <a href="https://github.com/Jabir-Srj/tinkr" className="text-accent hover:underline">Jabir</a></p>
            <p className="mt-1">Part of <a href="/" className="text-accent hover:underline">Tinkr</a> • Privacy-first tools</p>
          </div>
        </footer>
      </div>


    </div>
  );
}
