'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, RefreshCw } from 'lucide-react';

export default function LipsumGeneratorPage() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [content, setContent] = useState('');

  const generateLipsum = () => {
    const lorem =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    let result = '';
    if (type === 'paragraphs') {
      result = Array(count)
        .fill(lorem)
        .join('\n\n');
    } else if (type === 'sentences') {
      const sentences = lorem.split('. ');
      result = sentences
        .slice(0, Math.min(count, sentences.length))
        .join('. ');
    } else if (type === 'words') {
      const words = lorem.split(' ');
      result = words.slice(0, count).join(' ');
    }
    setContent(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const wordCount = content.split(/\s+/).filter((w) => w).length;
  const charCount = content.length;
  const paraCount = content.split('\n\n').filter((p) => p).length;

  return (
    <ToolTemplate
      title="Lipsum Generator"
      description="Generate placeholder text"
      icon="📝"
      onReset={() => {
        setType('paragraphs');
        setCount(3);
        setContent('');
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
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </InputGroup>

            <InputGroup label={`Count: ${count}`}>
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <button
              onClick={generateLipsum}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Generate
            </button>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Generated Text">
            <div className="relative">
              <textarea
                value={content}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 resize-none h-64"
              />
              {content && (
                <button
                  onClick={() => copyToClipboard(content)}
                  className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <Copy size={16} />
                </button>
              )}
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
                <p className="text-xs text-gray-600 dark:text-gray-400">Paragraphs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {paraCount}
                </p>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
