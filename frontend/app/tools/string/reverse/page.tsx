'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function TextReverserPage() {
  const [text, setText] = useState('Hello World');

  const reverseText = (str: string): string => {
    return str.split('').reverse().join('');
  };

  const reversed = reverseText(text);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <ToolTemplate
      title="Text Reverser"
      description="Reverse text, words, or lines"
      icon="↩️"
      onReset={() => setText('Hello World')}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <ToolCard title="Original Text">
            <InputGroup label="Input">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to reverse..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-48"
              />
            </InputGroup>

            <div className="mt-4 p-3 bg-gray-100 dark:bg-slate-900 rounded">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Length</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{text.length} characters</p>
            </div>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <ToolCard title="Reversed Text">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white break-all min-h-48 flex items-center font-mono">
                {reversed}
              </div>
              <button
                onClick={() => copyToClipboard(reversed)}
                className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
              >
                <Copy size={18} />
              </button>
            </div>
          </ToolCard>

          <ToolCard title="Reverse Options">
            <div className="space-y-3">
              {[
                {
                  label: 'Reverse Text',
                  value: reverseText(text),
                },
                {
                  label: 'Reverse Words',
                  value: text.split(' ').reverse().join(' '),
                },
                {
                  label: 'Reverse Lines',
                  value: text.split('\n').reverse().join('\n'),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2 p-3 bg-gray-100 dark:bg-slate-900 rounded">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
                    <code className="text-xs font-mono text-gray-900 dark:text-gray-100 break-all">
                      {item.value.substring(0, 50)}
                      {item.value.length > 50 ? '...' : ''}
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value)}
                    className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
