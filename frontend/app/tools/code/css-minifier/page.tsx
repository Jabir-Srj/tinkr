'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function CSSMinifierPage() {
  const [css, setCSS] = useState('.container {\n  padding: 20px;\n  background: #fff;\n}');

  const minify = (cssText: string) => {
    return cssText
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*;\s*/g, ';')
      .trim();
  };

  const minified = minify(css);
  const savings = Math.round(((1 - minified.length / css.length) * 100));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="CSS Minifier"
      description="Minify CSS code"
      icon="📦"
      onReset={() =>
        setCSS('.container {\n  padding: 20px;\n  background: #fff;\n}')
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <ToolCard title="Original CSS">
            <textarea
              value={css}
              onChange={(e) => setCSS(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-96 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">{css.length} characters</p>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <ToolCard title="Minified CSS">
            <div className="relative">
              <textarea
                value={minified}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 resize-none h-72 font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(minified)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">{minified.length} characters</p>
          </ToolCard>

          <ToolCard title="Stats">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold">Size Reduction</span>
                <span className="text-lg font-bold text-green-600">{savings}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold">Bytes Saved</span>
                <span className="font-mono">{css.length - minified.length}</span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
