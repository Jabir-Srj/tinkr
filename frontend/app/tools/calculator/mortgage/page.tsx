'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return (
    <ToolTemplate
      title="Mortgage Calculator"
      description="Calculate mortgage payments"
      icon="🏠"
      onReset={() => {
        setHomePrice(300000);
        setDownPayment(60000);
        setRate(6.5);
        setYears(30);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Details">
            <InputGroup label={`Home Price: $${homePrice.toLocaleString()}`}>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={homePrice}
                onChange={(e) => setHomePrice(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Down Payment: $${downPayment.toLocaleString()}`}>
              <input
                type="range"
                min="0"
                max={homePrice * 0.5}
                step="10000"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Interest Rate: ${rate.toFixed(2)}%`}>
              <input
                type="range"
                min="2"
                max="12"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Loan Term: ${years} years`}>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
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
              <p className="text-5xl font-bold text-blue-600">
                ${monthlyPayment.toFixed(2)}
              </p>
            </div>
          </ToolCard>

          <ToolCard title="Loan Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Down Payment
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  ${downPayment.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Loan Amount
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
              <div className="flex justify-between items-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total Paid
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  ${totalPayment.toFixed(2)}
                </span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
