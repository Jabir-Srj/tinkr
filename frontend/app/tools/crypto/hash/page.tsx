'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';
import crypto from 'crypto';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const generateHash = (algorithm: 'md5' | 'sha256') => {
    if (!input) return '';
    return crypto.createHash(algorithm).update(input).digest('hex');
  };

  const md5 = generateHash('md5');
  const sha256 = generateHash('sha256');

  const copy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">#️⃣ Hash Generator</h1>
            <p className="text-muted-foreground">Generate MD5 and SHA256 hashes</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">MD5</label>
              <div className="relative">
                <input
                  type="text"
                  value={md5}
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm"
                />
                {md5 && (
                  <button
                    onClick={() => copy(md5, 'md5')}
                    className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
                  >
                    {copied === 'md5' ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SHA256</label>
              <div className="relative">
                <input
                  type="text"
                  value={sha256}
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm"
                />
                {sha256 && (
                  <button
                    onClick={() => copy(sha256, 'sha256')}
                    className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
                  >
                    {copied === 'sha256' ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
