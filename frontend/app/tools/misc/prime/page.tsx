'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PrimeNumberPage() {
  const [number, setNumber] = useState(17);
  const [isPrime, setIsPrime] = useState(true);
  const [factors, setFactors] = useState<number[]>([]);

  const checkPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const getFactors = (num: number): number[] => {
    const result: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) result.push(i);
    }
    return result;
  };

  const handleCheck = () => {
    const num = parseInt(number.toString());
    if (!isNaN(num)) {
      setIsPrime(checkPrime(num));
      setFactors(getFactors(num));
    }
  };

  const numVal = parseInt(number.toString());

  return (
    <ToolTemplate
      title="Prime Number Checker"
      description="Check if a number is prime and find its factors"
      icon="🔢"
      onReset={() => {
        setNumber(17);
        setIsPrime(true);
        setFactors([]);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Input">
            <InputGroup label="Number">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <button
              onClick={handleCheck}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Check
            </button>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status */}
          {numVal > 0 && (
            <>
              {isPrime ? (
                <ToolCard>
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-200">{numVal} is Prime!</p>
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Only divisible by 1 and itself
                      </p>
                    </div>
                  </div>
                </ToolCard>
              ) : (
                <ToolCard>
                  <div className="flex gap-3 items-start">
                    <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-200">{numVal} is Not Prime</p>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        It has multiple factors
                      </p>
                    </div>
                  </div>
                </ToolCard>
              )}

              {/* Factors */}
              <ToolCard title="Factors">
                <div className="flex flex-wrap gap-2">
                  {factors.map((f) => (
                    <span
                      key={f}
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${
                        f === 1 || f === numVal
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </ToolCard>

              {/* Info */}
              <ToolCard title="Properties">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Number</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{numVal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Factor Count</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {factors.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Is Even</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {numVal % 2 === 0 ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Square Root</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {Math.sqrt(numVal).toFixed(2)}
                    </span>
                  </div>
                </div>
              </ToolCard>

              {/* Examples */}
              <ToolCard title="Prime Examples">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">First 20 primes:</p>
                <p className="font-mono text-xs text-gray-900 dark:text-gray-100">
                  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71
                </p>
              </ToolCard>
            </>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
