'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function TipCalculator() {
  const [amount, setAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [copied, setCopied] = useState(false);

  const tipAmount = amount ? (parseFloat(amount) * parseFloat(tipPercent) / 100).toFixed(2) : '0.00';
  const total = amount ? (parseFloat(amount) + parseFloat(tipAmount)).toFixed(2) : '0.00';
  const perPerson = people && amount ? (parseFloat(total) / parseFloat(people)).toFixed(2) : '0.00';

  const result = `Tip: $${tipAmount} | Total: $${total} | Per Person: $${perPerson}`;

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
            <h1 className="text-3xl font-bold mb-2">💰 Tip Calculator</h1>
            <p className="text-muted-foreground">Calculate tips and split bills</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Bill Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tip (%)</label>
                <input
                  type="number"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(e.target.value)}
                  placeholder="15"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">People</label>
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  min="1"
                  placeholder="1"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tip Amount:</span>
              <span className="font-bold text-accent">${tipAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold text-accent">${total}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-accent/30 pt-2 mt-2">
              <span className="text-muted-foreground">Per Person:</span>
              <span className="font-bold text-green-500">${perPerson}</span>
            </div>
          </div>

          <button
            onClick={copy}
            className="w-full py-2 px-4 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
