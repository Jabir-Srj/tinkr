'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Copy, RefreshCw } from 'lucide-react';

export default function PaletteGeneratorPage() {
  const [palette, setPalette] = useState<string[]>(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']);

  const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

  const generatePalette = () => {
    const newPalette = Array(5).fill(null).map(() => generateRandomColor());
    setPalette(newPalette);
  };

  const updateColor = (idx: number, color: string) => {
    const newPalette = [...palette];
    newPalette[idx] = color;
    setPalette(newPalette);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Color Palette Generator"
      description="Generate and customize color palettes"
      icon="🎨"
      onReset={() => setPalette(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'])}
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          <button
            onClick={generatePalette}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Generate Random
          </button>
        </div>

        {/* Palette Display */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {palette.map((color, idx) => (
            <ToolCard key={idx}>
              <div className="space-y-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(idx, e.target.value)}
                  className="w-full h-32 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateColor(idx, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(color)}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </ToolCard>
          ))}
        </div>

        {/* Export */}
        <ToolCard title="Export Palette">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">CSS Variables</p>
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                {palette.map((c, i) => `--color-${i}: ${c};\n`).join('')}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tailwind Config</p>
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                {`colors: { custom: [\n${palette.map((c, i) => `  '${i}': '${c}',`).join('\n')}\n]}`}
              </div>
            </div>
          </div>
        </ToolCard>
      </div>
    </ToolTemplate>
  );
}
