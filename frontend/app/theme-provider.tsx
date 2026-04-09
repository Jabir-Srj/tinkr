'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('tinkr-theme') as Theme | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = saved || (systemDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback((newTheme: Theme) => {
    const html = document.documentElement;
    const body = document.body;

    // Keep both roots in sync so dark:* utilities never get stuck on one node.
    html.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');

    if (newTheme === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.add('light');
      body.classList.add('light');
    }

    localStorage.setItem('tinkr-theme', newTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
