'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function UnitConverterAdvanced() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [category, setCategory] = useState('length');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const conversions = {
    length: {
      'm': 1,
      'km': 0.001,
      'cm': 100,
      'mm': 1000,
      'mi': 0.000621371,
      'yd': 1.09361,
      'ft': 3.28084,
      'in': 39.3701,
    },
    weight: {
      'kg': 1,
      'g': 1000,
      'mg': 1000000,
      'lb': 2.20462,
      'oz': 35.274,
      'ton': 0.001,
    },
    volume: {
      'L': 1,
      'mL': 1000,
      'gal': 0.264172,
      'qt': 1.05669,
      'pt': 2.11338,
      'cup': 4.22675,
      'fl oz': 33.814,
    },
    speed: {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
      'knot': 1.94384,
    },
  } as const;

  const tempConversions: Record<string, (c: number) => number> = {
    'C': (c: number) => c,
    'F': (c: number) => (c * 9) / 5 + 32,
    'K': (c: number) => c + 273.15,
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    let resultValue: number;

    if (category === 'temperature') {
      const celcius = fromUnit === 'C' ? val : fromUnit === 'F' ? (val - 32) * (5 / 9) : val - 273.15;
      resultValue = tempConversions[toUnit](celcius);
    } else {
      const conversionData = conversions[category as keyof typeof conversions] as Record<string, number>;
      const fromRate = conversionData[fromUnit];
      const toRate = conversionData[toUnit];
      resultValue = (val * fromRate) / toRate;
    }

    setResult(resultValue.toFixed(6).replace(/\.?0+$/, ''));
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAvailableUnits = () => {
    if (category === 'temperature') {
      return Object.keys(tempConversions);
    }
    return Object.keys(conversions[category as keyof typeof conversions] || {});
  };

  const availableUnits = getAvailableUnits();

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">⚖️ Unit Converter Advanced</h1>
            <p className="text-muted-foreground">Convert between various units</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const units = e.target.value === 'temperature' ? Object.keys(tempConversions) : Object.keys(conversions[e.target.value as keyof typeof conversions] || {});
                  setFromUnit(units[0]);
                  setToUnit(units[1] || units[0]);
                }}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="volume">Volume</option>
                <option value="speed">Speed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter value..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Result</label>
              <div className="relative">
                <input
                  type="text"
                  value={result}
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono focus:outline-none"
                  placeholder="Result..."
                />
                {result && (
                  <button
                    onClick={copy}
                    className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground transition"
                  >
                    <Copy size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={convert}
                className="flex-1 px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
              >
                Convert
              </button>
              <button
                onClick={() => {
                  setValue('');
                  setResult('');
                }}
                className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
