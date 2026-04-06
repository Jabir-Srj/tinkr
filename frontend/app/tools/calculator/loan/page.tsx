'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(5);
  const [months, setMonths] = useState(360);

  const monthlyRate = rate / 100 / 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = monthlyPayment * months;
  const totalInterest = totalAmount - principal;

  return (
    <ToolTemplate
      title="Loan Calculator"
      description="Calculate loan payments and interest"
      icon="🏦"
      onReset={() => {
        setPrincipal(100000);
        setRate(5);
        setMonths(360);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Loan Details">
            <InputGroup label={`Principal: $${principal.toLocaleString()}`}>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Interest Rate: ${rate.toFixed(2)}%`}>
              <input
                type="range"
                min="0.1"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Duration: ${months} months (${(months / 12).toFixed(1)} years)`}>
              <input
                type="range"
                min="12"
                max="480"
                step="12"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Monthly Payment
              </p>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                ${monthlyPayment.toFixed(2)}
              </p>
            </div>
          </ToolCard>

          <ToolCard title="Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Principal
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  ${principal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total Interest
                </span>
                <span className="font-mono text-red-600 dark:text-red-400">
                  ${totalInterest.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total Amount
                </span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
