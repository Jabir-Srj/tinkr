'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function TipSplitCalculatorPage() {
  const [billAmount, setBillAmount] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(4);

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / people;

  return (
    <ToolTemplate
      title="Tip & Split Calculator"
      description="Split bills and calculate tips"
      icon="🧮"
      onReset={() => {
        setBillAmount(100);
        setTipPercent(15);
        setPeople(4);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label={`Bill: $${billAmount.toFixed(2)}`}>
              <input
                type="range"
                min="0"
                max="500"
                step="5"
                value={billAmount}
                onChange={(e) => setBillAmount(parseFloat(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Tip: ${tipPercent}%`}>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 18, 20].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setTipPercent(tip)}
                    className={`py-2 rounded font-semibold transition ${
                      tipPercent === tip
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {tip}%
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={tipPercent}
                onChange={(e) => setTipPercent(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </InputGroup>

            <InputGroup label={`People: ${people}`}>
              <input
                type="range"
                min="1"
                max="20"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ToolCard>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tip Amount</p>
                <p className="text-4xl font-bold text-green-600">
                  ${tipAmount.toFixed(2)}
                </p>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Per Person</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${perPerson.toFixed(2)}
                </p>
              </div>
            </ToolCard>
          </div>

          <ToolCard title="Breakdown">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Subtotal
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  ${billAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Tip ({tipPercent}%)
                </span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400">
                  ${tipAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Per Person ({people})
                </span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  ${perPerson.toFixed(2)}
                </span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
