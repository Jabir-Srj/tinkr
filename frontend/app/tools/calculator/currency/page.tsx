'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

const currencies = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MYR: 4.73,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const converted = ((amount * currencies[to as keyof typeof currencies]) / currencies[from as keyof typeof currencies]).toFixed(2);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Currency Converter"
      description="Convert between major currencies"
      icon="💱"
      onReset={() => {
        setAmount(100);
        setFrom('USD');
        setTo('EUR');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Convert">
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
                {Object.keys(currencies).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
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
                {Object.keys(currencies).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Result */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard>
            <div className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                {amount} {from}
              </p>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {converted}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">{to}</p>
            </div>
          </ToolCard>

          <ToolCard>
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-gray-100">
                {amount} {from} = {converted} {to}
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`${amount} ${from} = ${converted} ${to}`)
                }
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <ToolCard title="Exchange Rates">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(currencies).map(([curr, rate]) => (
                <div
                  key={curr}
                  className="flex justify-between p-2 bg-gray-100 dark:bg-slate-900 rounded"
                >
                  <span className="font-semibold">{curr}</span>
                  <span className="text-gray-600 dark:text-gray-400">{rate}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">* Rates are approximate</p>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
