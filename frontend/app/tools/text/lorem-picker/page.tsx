'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function LoremPickerPage() {
  const [selectedCount, setSelectedCount] = useState(5);
  const [type, setType] = useState('paragraphs');

  const paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  ];

  const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ');

  const content =
    type === 'paragraphs'
      ? paragraphs.slice(0, selectedCount).join('\n\n')
      : type === 'words'
        ? words.slice(0, selectedCount).join(' ')
        : words.slice(0, selectedCount).map((w) => `<span>${w}</span>`).join(' ');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const wordCount = content.split(/\s+/).filter((w) => w).length;
  const charCount = content.length;
  const sizeKB = (content.length / 1024).toFixed(2);

  return (
    <ToolTemplate
      title="Lorem Ipsum Picker"
      description="Pick and copy Lorem Ipsum"
      icon="📄"
      onReset={() => {
        setSelectedCount(5);
        setType('paragraphs');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="words">Words</option>
                <option value="spans">Spans</option>
              </select>
            </InputGroup>

            <InputGroup label={`Count: ${selectedCount}`}>
              <input
                type="range"
                min="1"
                max={type === 'paragraphs' ? 5 : 50}
                value={selectedCount}
                onChange={(e) => setSelectedCount(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Preview">
            <div className="relative">
              <textarea
                value={content}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 resize-none h-64 font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(content)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <ToolCard title="Stats">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Words</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {wordCount}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Characters</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {charCount}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Size</p>
                <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                  {sizeKB} KB
                </p>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
