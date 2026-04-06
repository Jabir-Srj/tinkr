'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function BaseConverter() {
  const [decimal, setDecimal] = useState('');
  const [copied, setCopied] = useState(false);

  const num = parseInt(decimal) || 0;
  const result = `Decimal: ${num} | Hex: 0x${num.toString(16).toUpperCase()} | Binary: ${num.toString(2)} | Octal: 0o${num.toString(8)}`;

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔢 Base Converter</h1>
            <p className="text-muted-foreground">Decimal ↔ Hex ↔ Binary ↔ Octal</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Decimal Number</label>
            <input 
              type="number" 
              value={decimal} 
              onChange={(e) => setDecimal(e.target.value)} 
              placeholder="256" 
              className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Result</label>
            <div className="relative">
              <textarea 
                value={result} 
                readOnly 
                className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm" 
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
    </LegacyToolWrapper>
  );
}
