'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

const conversions: { [key: string]: { [key: string]: number } } = {
  distance: { m: 1, km: 0.001, mi: 0.000621, ft: 3.28084, in: 39.3701, cm: 100 },
  weight: { kg: 1, lb: 2.20462, oz: 35.274, g: 1000, ton: 0.001 },
  volume: { L: 1, mL: 1000, gal: 0.264172, cup: 4.22675, pint: 2.11338 },
  temperature: { C: 1, F: 1, K: 1 },
};

export default function UniversalConverterPage() {
  const [category, setCategory] = useState('distance');
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');

  const getConversions = () => {
    const cats = Object.keys(conversions);
    if (cats.includes(category)) {
      return Object.keys(conversions[category]);
    }
    return [];
  };

  const convert = () => {
    if (category === 'temperature') {
      if (from === 'C' && to === 'F') return ((amount * 9) / 5 + 32).toFixed(4);
      if (from === 'F' && to === 'C') return (((amount - 32) * 5) / 9).toFixed(4);
      if (from === 'C' && to === 'K') return (amount + 273.15).toFixed(4);
      if (from === 'K' && to === 'C') return (amount - 273.15).toFixed(4);
      return amount.toFixed(4);
    }
    const fromRate = conversions[category][from];
    const toRate = conversions[category][to];
    return ((amount / fromRate) * toRate).toFixed(4);
  };

  const result = convert();

  return (
    <ToolTemplate
      title="Universal Converter"
      description="Convert between units"
      icon="🔄"
      onReset={() => {
        setCategory('distance');
        setAmount(1);
        setFrom('m');
        setTo('km');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Category">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const newUnits = getConversions();
                  if (newUnits.length > 0) {
                    setFrom(newUnits[0]);
                    setTo(newUnits[1] || newUnits[0]);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                {Object.keys(conversions).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </InputGroup>

            <InputGroup label="Amount">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="From">
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                {getConversions().map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </InputGroup>

            <InputGroup label="To">
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                {getConversions().map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Result */}
        <div className="lg:col-span-2">
          <ToolCard>
            <div className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                {amount} {from}
              </p>
              <p className="text-5xl font-bold text-blue-600 mb-2">{result}</p>
              <p className="text-lg text-gray-600 dark:text-gray-400">{to}</p>
            </div>
          </ToolCard>

          <div className="mt-4">
            <ToolCard title="Formula">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                {amount} {from} = {result} {to}
              </p>
            </ToolCard>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
