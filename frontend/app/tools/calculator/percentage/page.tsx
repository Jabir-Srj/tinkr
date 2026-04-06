'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function PercentageCalculator() {
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('');
  const [copied, setCopied] = useState(false);

  const result = amount && percentage ? (parseFloat(amount) * parseFloat(percentage) / 100).toFixed(2) : '';

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
            <h1 className="text-3xl font-bold mb-2">📊 Percentage Calculator</h1>
            <p className="text-muted-foreground">Calculate percentages easily</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Percentage (%)</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
              />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium">Result</label>
            <div className="relative">
              <input
                type="text"
                value={result}
                readOnly
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none font-medium"
              />
              {result && (
                <button
                  onClick={copy}
                  className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => { setAmount(''); setPercentage(''); }}
            className="w-full py-2 px-4 bg-border text-foreground rounded-lg hover:bg-border/80 transition font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
