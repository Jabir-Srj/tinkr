'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function FibonacciGeneratorPage() {
  const [count, setCount] = useState(10);
  const [sequence, setSequence] = useState<number[]>([]);

  const generateFibonacci = () => {
    const fib: number[] = [0, 1];
    for (let i = 2; i < count; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    setSequence(fib.slice(0, count));
  };

  const handleGenerate = () => {
    if (count > 0) generateFibonacci();
  };

  const sum = sequence.reduce((a, b) => a + b, 0);
  const max = Math.max(...sequence, 0);
  const min = Math.min(...sequence, 0);

  return (
    <ToolTemplate
      title="Fibonacci Generator"
      description="Generate Fibonacci number sequences"
      icon="📈"
      onReset={() => {
        setCount(10);
        setSequence([]);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Number of Terms">
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <button
              onClick={handleGenerate}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Generate
            </button>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          {sequence.length > 0 && (
            <>
              {/* Sequence */}
              <ToolCard title="Fibonacci Sequence">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sequence.map((num, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 rounded"
                    >
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        F({idx})
                      </span>
                      <span className="text-lg font-mono font-bold text-gray-900 dark:text-gray-100">
                        {num}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sequence as text */}
                <div className="mt-4 p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Full Sequence</p>
                  <p className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                    {sequence.join(', ')}
                  </p>
                </div>
              </ToolCard>

              {/* Statistics */}
              <ToolCard title="Statistics">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Sum</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{sum}</p>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <p className="text-xs text-teal-600 dark:text-teal-400 mb-1">Max</p>
                    <p className="text-2xl font-bold text-teal-900 dark:text-teal-200">{max}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="text-xs text-green-600 dark:text-green-400 mb-1">Min</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-200">{min}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Count</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                      {sequence.length}
                    </p>
                  </div>
                </div>
              </ToolCard>

              {/* Information */}
              <ToolCard title="About Fibonacci">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  The Fibonacci sequence is a series of numbers where each number is the sum of the two
                  preceding ones, starting from 0 and 1.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                  F(n) = F(n-1) + F(n-2)
                </p>
              </ToolCard>
            </>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
