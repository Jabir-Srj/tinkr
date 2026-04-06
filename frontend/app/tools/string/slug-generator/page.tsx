'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function SlugGeneratorPage() {
  const [text, setText] = useState('Hello World Example');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);

  const generateSlug = () => {
    let slug = text;

    if (lowercase) {
      slug = slug.toLowerCase();
    }

    if (removeSpecial) {
      slug = slug.replace(/[^\w\s-]/g, '');
    }

    slug = slug.trim().replace(/\s+/g, separator);

    return slug;
  };

  const slug = generateSlug();

  return (
    <ToolTemplate
      title="Slug Generator"
      description="Generate URL-friendly slugs from text"
      icon="🔗"
      onReset={() => {
        setText('Hello World Example');
        setSeparator('-');
        setLowercase(true);
        setRemoveSpecial(true);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Options">
            <InputGroup label="Text Input">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <InputGroup label="Separator">
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value="">No separator</option>
              </select>
            </InputGroup>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Convert to lowercase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeSpecial}
                  onChange={(e) => setRemoveSpecial(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Remove special characters</span>
              </label>
            </div>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <ToolCard>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Generated Slug</p>
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white text-2xl font-mono font-bold break-all">
                    {slug || 'your-slug'}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(slug)}
                    className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* Preview URLs */}
              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-slate-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Example URLs</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-gray-100 dark:bg-slate-900 rounded font-mono break-all">
                    https://example.com/blog/{slug}
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-slate-900 rounded font-mono break-all">
                    https://example.com/posts/{slug}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200 dark:border-slate-700">
                <ToolCard>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Input Length</p>
                    <p className="text-2xl font-bold text-blue-600">{text.length}</p>
                  </div>
                </ToolCard>
                <ToolCard>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Slug Length</p>
                    <p className="text-2xl font-bold text-blue-600">{slug.length}</p>
                  </div>
                </ToolCard>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
