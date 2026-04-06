'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const slug = slugify(input);

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔗 Slug Generator</h1>
            <p className="text-muted-foreground">Convert text to URL-friendly slugs</p>
          </div>

          {/* Input */}
          <div className="space-y-3 mb-8">
            <label className="block text-sm font-medium">Text to Convert</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to create slug..."
              className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition resize-none"
            />
          </div>

          {/* Output */}
          {input && (
            <div className="space-y-3 mb-8">
              <label className="block text-sm font-medium">Slug</label>
              <div className="relative">
                <input
                  type="text"
                  value={slug}
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono"
                />
                <button
                  onClick={copy}
                  className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent">
            <p className="font-medium mb-2">What is a slug?</p>
            <p>A URL-friendly version of text. Converts spaces to hyphens and removes special characters.</p>
            <p className="mt-2"><strong>Example:</strong> "My Cool Blog Post" → "my-cool-blog-post"</p>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
