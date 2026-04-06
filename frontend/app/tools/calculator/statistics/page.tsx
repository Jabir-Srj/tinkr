'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function Statistics() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const numbers = input.split(/[\s,\n]+/).map(n => parseFloat(n)).filter(n => !isNaN(n)).sort((a, b) => a - b);

  const mean = numbers.length > 0 ? (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2) : '0';
  const median = numbers.length > 0 ? (numbers.length % 2 === 0 
    ? ((numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2).toFixed(2)
    : numbers[Math.floor(numbers.length / 2)].toFixed(2)) : '0';
  const mode = numbers.length > 0 ? (() => {
    const counts: any = {};
    numbers.forEach(n => counts[n] = (counts[n] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  })() : '0';
  const std = numbers.length > 1 ? Math.sqrt(numbers.reduce((sq, n) => sq + Math.pow(n - parseFloat(mean), 2), 0) / numbers.length).toFixed(2) : '0';
  const min = numbers.length > 0 ? Math.min(...numbers).toFixed(2) : '0';
  const max = numbers.length > 0 ? Math.max(...numbers).toFixed(2) : '0';

  const result = `Mean: ${mean} | Median: ${median} | Mode: ${mode} | Std Dev: ${std} | Min: ${min} | Max: ${max}`;

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📈 Statistics</h1>
            <p className="text-muted-foreground">Mean, median, mode, std dev</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Numbers (comma or space separated)</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="1, 2, 3, 4, 5"
                className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Result</label>
              <div className="relative">
                <textarea
                  value={result}
                  readOnly
                  className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none"
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
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
