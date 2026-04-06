'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } };

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [copied, setCopied] = useState(false);

  const conversions: any = {
    m: { ft: 3.28084, km: 0.001, yd: 1.09361, mi: 0.000621371 },
    ft: { m: 0.3048, km: 0.0003048, yd: 0.333333, mi: 0.000189394 },
    kg: { lb: 2.20462, oz: 35.274, g: 1000 },
    lb: { kg: 0.453592, oz: 16, g: 453.592 },
    c: { f: (v: number) => (v * 9/5) + 32, k: (v: number) => v + 273.15 },
    f: { c: (v: number) => (v - 32) * 5/9, k: (v: number) => (v - 32) * 5/9 + 273.15 }
  };

  let result = '';
  if (value) {
    const num = parseFloat(value);
    const conv = conversions[from]?.[to];
    if (typeof conv === 'function') result = conv(num).toFixed(4);
    else if (conv) result = (num * conv).toFixed(4);
  }

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
            <h1 className="text-3xl font-bold mb-2">📏 Unit Converter</h1>
            <p className="text-muted-foreground">Length, weight, temperature conversion</p>
          </div>

          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent"
              >
                {Object.keys(conversions).map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent"
              >
                {Object.keys(conversions[from] || {}).map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={result}
              readOnly
              className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono font-medium"
              placeholder="Result"
            />
            {result && (
              <button
                onClick={copy}
                className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
