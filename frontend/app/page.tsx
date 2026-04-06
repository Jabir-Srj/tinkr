'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, Lock, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/theme-provider';
import { tools, categories, stats } from '@/lib/tools';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary-bg hover:bg-border text-foreground transition-all duration-300"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredTools, setFilteredTools] = useState(tools);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let filtered = tools;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
      {/* Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div className="text-xl font-bold text-foreground">tinkr</div>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm">
              <a href="#about" className="text-muted-foreground hover:text-accent transition font-medium">
                About
              </a>
              <a href="#tools" className="text-muted-foreground hover:text-accent transition font-medium">
                Tools
              </a>
              <a href="https://github.com/Jabir-Srj/tinkr" className="text-muted-foreground hover:text-accent transition font-medium">
                GitHub
              </a>
            </nav>
            
            <ThemeToggleButton />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 bg-gradient-to-b from-background via-background to-secondary-bg transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold text-foreground">
                tinkr
              </h1>
              <p className="text-2xl text-foreground leading-relaxed">
                Fast, minimal tools for developers.
              </p>
              <p className="text-muted-foreground text-lg">
                109 utilities • 100% private • Zero pricing • Client-side only
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-4xl font-bold text-accent">{stats.total}</div>
                <div className="text-sm text-muted-foreground mt-1">tools ready</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">{stats.categories}</div>
                <div className="text-sm text-muted-foreground mt-1">categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">$0</div>
                <div className="text-sm text-muted-foreground mt-1">forever free</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-8 border-t border-border">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Lock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>No tracking, no logins, no BS. Everything runs in your browser.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Designed for developers who value simplicity and speed.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section id="tools" className="relative py-20 px-6 bg-secondary-bg transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="space-y-8"
          >
            {/* Title */}
            <div className="border-l-4 border-accent pl-6">
              <h2 className="text-4xl font-bold text-foreground">All Tools</h2>
              <p className="text-muted-foreground text-lg mt-2">Pick what you need</p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-background text-foreground placeholder-muted focus:outline-none text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 text-sm rounded-lg transition font-medium ${
                    selectedCategory === cat.value
                      ? 'border border-accent bg-accent/10 text-accent'
                      : 'border border-border text-muted-foreground hover:border-accent hover:text-accent'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredTools.map((tool, i) => (
              <motion.a
                key={i}
                href={tool.url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ y: -2 }}
                className="p-6 border border-border rounded-lg bg-background hover:border-accent transition group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{tool.emoji}</div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition">
                  {tool.description}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <div className="mt-12 text-center text-muted-foreground">
              <p>No tools found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 bg-background border-t border-border transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="space-y-8"
          >
            <div className="border-l-4 border-accent pl-6">
              <h2 className="text-4xl font-bold text-foreground">About Tinkr</h2>
            </div>

            <div className="space-y-6 text-foreground text-base leading-relaxed">
              <p>
                Tinkr is a collection of fast, minimal tools designed for developers. No tracking. No logins. No overthinking.
              </p>
              <p>
                Everything runs client-side in your browser. Your data stays yours. All source code is open, and you can fork it, improve it, and make it your own.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Lock className="w-5 h-5" />
                    <span className="font-semibold text-foreground">Privacy First</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Zero data collection. No servers. No tracking. Ever.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Zap className="w-5 h-5" />
                    <span className="font-semibold text-foreground">Lightning Fast</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Instant results. No loading. No delays. Pure speed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border bg-secondary-bg py-12 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Made by Jabir • MIT License • <a href="https://github.com/Jabir-Srj/tinkr" className="text-accent hover:underline">GitHub</a>
            </p>
            <p className="text-xs text-muted">
              v2.0 | 109 tools | 17 categories | 0% BS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
