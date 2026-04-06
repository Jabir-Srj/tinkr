'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';

const tailwindClasses = {
  spacing: ['p-0 to p-96', 'm-0 to m-96', 'gap-0 to gap-96'],
  typography: ['text-xs to text-9xl', 'font-thin to font-black', 'tracking-tighter to tracking-widest'],
  colors: ['text-slate-50 to text-slate-950', 'bg-red-100 to bg-red-900', 'border-blue-200 to border-blue-900'],
  effects: ['shadow-none to shadow-2xl', 'opacity-0 to opacity-100', 'blur-none to blur-3xl'],
  layout: ['flex, grid, block, inline', 'w-full, h-screen, max-w-max', 'justify-between, items-center'],
};

export default function TailwindCheatSheetPage() {
  const [selectedCategory, setSelectedCategory] = useState('spacing');

  return (
    <ToolTemplate
      title="Tailwind CSS Cheat Sheet"
      description="Quick reference for Tailwind CSS classes"
      icon="🎨"
    >
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div>
          <ToolCard title="Categories">
            <div className="space-y-2">
              {Object.keys(tailwindClasses).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition capitalize font-semibold ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ToolCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          <ToolCard title={`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Classes`}>
            <div className="space-y-3">
              {tailwindClasses[selectedCategory as keyof typeof tailwindClasses].map((cls, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(cls)}
                >
                  <code className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-300">
                    {cls}
                  </code>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Click to copy</p>
                </div>
              ))}
            </div>
          </ToolCard>

          <ToolCard title="Common Utilities">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'container',
                'sr-only',
                'transition',
                'duration-300',
                'ease-in-out',
                'transform',
                'hover:',
                'focus:',
                'dark:',
                'md:',
                'lg:',
                'xl:',
              ].map((util) => (
                <div
                  key={util}
                  className="p-2 bg-gray-100 dark:bg-slate-900 rounded font-mono text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800"
                  onClick={() => navigator.clipboard.writeText(util)}
                >
                  {util}
                </div>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
