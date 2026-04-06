'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function CaseConverterPage() {
  const [text, setText] = useState('Hello World');

  const conversions = {
    uppercase: text.toUpperCase(),
    lowercase: text.toLowerCase(),
    titlecase: text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
    camelcase: text.split(' ').map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(''),
    snakecase: text.toLowerCase().replace(/\s+/g, '_'),
    kebabcase: text.toLowerCase().replace(/\s+/g, '-'),
    pascalcase: text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(''),
    dotcase: text.toLowerCase().replace(/\s+/g, '.'),
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <ToolTemplate
      title="Case Converter"
      description="Convert text between different case styles"
      icon="🔤"
      onReset={() => setText('Hello World')}
    >
      <ToolCard title="Input Text">
        <InputGroup label="Enter text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
          />
        </InputGroup>
      </ToolCard>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(conversions).map(([name, value]) => (
          <ToolCard key={name} title={name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}>
            <div className="space-y-2">
              <code className="block p-3 bg-gray-100 dark:bg-slate-800 rounded text-xs font-mono text-gray-900 dark:text-gray-100 break-all">
                {value}
              </code>
              <button
                onClick={() => copyToClipboard(value)}
                className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <Copy size={14} />
                Copy
              </button>
            </div>
          </ToolCard>
        ))}
      </div>
    </ToolTemplate>
  );
}
