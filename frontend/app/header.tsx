'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const ThemeToggle = dynamic(() => import('./theme-toggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />,
});

export function Header() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#c96442] rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">tinkr</div>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-[#c96442] dark:hover:text-[#c96442] transition font-medium">
              About
            </a>
            <a href="#tools" className="text-gray-600 dark:text-gray-400 hover:text-[#c96442] dark:hover:text-[#c96442] transition font-medium">
              Tools
            </a>
            <a href="https://github.com/Jabir-Srj/tinkr" className="text-gray-600 dark:text-gray-400 hover:text-[#c96442] dark:hover:text-[#c96442] transition font-medium">
              GitHub
            </a>
          </nav>
          
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
