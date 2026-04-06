'use client';

import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme
    const saved = localStorage.getItem('tinkr-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (systemDark ? 'dark' : 'light');
    
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const html = document.documentElement;
    const currentIsDark = html.classList.contains('dark');
    const newIsDark = !currentIsDark;

    // Toggle the class
    if (newIsDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem('tinkr-theme', newIsDark ? 'dark' : 'light');
    
    // Update state
    setIsDark(newIsDark);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-secondary-bg hover:bg-border text-foreground transition-all duration-300"
        disabled
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary-bg hover:bg-border text-foreground transition-all duration-300"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        // Sun icon - shows in dark mode
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : (
        // Moon icon - shows in light mode
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1 .12-11.5 1 1 0 0 0 1.09-1.63 10 10 0 1 0 .14 13.27 1 1 0 0 0-.2-1" />
        </svg>
      )}
    </button>
  );
}
