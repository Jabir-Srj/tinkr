'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function TextCaseConverterPage() {
  const [text, setText] = useState('Hello World Example');
  const [caseType, setCaseType] = useState('lowercase');

  const convertCase = (text: string, type: string): string => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'titlecase':
        return text
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      case 'camelcase':
        return text
          .split(' ')
          .map((word, i) =>
            i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join('');
      case 'pascalcase':
        return text
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('');
      case 'snakecase':
        return text.toLowerCase().replace(/\s+/g, '_');
      case 'kebabcase':
        return text.toLowerCase().replace(/\s+/g, '-');
      default:
        return text;
    }
  };

  const result = convertCase(text, caseType);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <ToolTemplate
      title="Text Case Converter"
      description="Convert text to different cases and formats"
      icon="🔤"
      onReset={() => {
        setText('Hello World Example');
        setCaseType('lowercase');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Input">
            <InputGroup label="Text">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Controls & Output */}
        <div className="lg:col-span-2">
          <ToolCard title="Case Conversions">
            <InputGroup label="Select Format">
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lowercase">lowercase</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="titlecase">Title Case</option>
                <option value="camelcase">camelCase</option>
                <option value="pascalcase">PascalCase</option>
                <option value="snakecase">snake_case</option>
                <option value="kebabcase">kebab-case</option>
              </select>
            </InputGroup>

            <div className="mt-6 space-y-4">
              {/* Main Output */}
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white break-all font-mono text-lg min-h-24 flex items-center">
                  {result}
                </div>
                <button
                  onClick={() => copyToClipboard(result)}
                  className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
                >
                  <Copy size={18} />
                </button>
              </div>

              {/* All Formats */}
              <ToolCard title="All Formats">
                <div className="space-y-2">
                  {[
                    { label: 'lowercase', value: convertCase(text, 'lowercase') },
                    { label: 'UPPERCASE', value: convertCase(text, 'uppercase') },
                    { label: 'Title Case', value: convertCase(text, 'titlecase') },
                    { label: 'camelCase', value: convertCase(text, 'camelcase') },
                    { label: 'PascalCase', value: convertCase(text, 'pascalcase') },
                    { label: 'snake_case', value: convertCase(text, 'snakecase') },
                    { label: 'kebab-case', value: convertCase(text, 'kebabcase') },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-2 p-3 bg-gray-100 dark:bg-slate-900 rounded"
                    >
                      <code className="font-mono text-xs text-gray-900 dark:text-gray-100 flex-1 break-all">
                        {item.value}
                      </code>
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
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
