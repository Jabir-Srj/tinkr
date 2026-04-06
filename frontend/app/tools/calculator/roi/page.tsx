'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function ROICalculatorPage() {
  const [investment, setInvestment] = useState(10000);
  const [return_value, setReturnValue] = useState(2000);
  const [years, setYears] = useState(1);

  const roi = ((return_value - investment) / investment) * 100;
  const annualROI = roi / years;
  const totalReturn = investment + return_value;
  const roi_percentage = ((return_value / investment) * 100).toFixed(2);

  return (
    <ToolTemplate
      title="ROI Calculator"
      description="Calculate return on investment"
      icon="📈"
      onReset={() => {
        setInvestment(10000);
        setReturnValue(2000);
        setYears(1);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Investment Details">
            <InputGroup label={`Initial Investment: $${investment.toLocaleString()}`}>
              <input
                type="range"
                min="100"
                max="1000000"
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Net Return/Profit: $${return_value.toLocaleString()}`}>
              <input
                type="range"
                min="-100000"
                max="500000"
                step="1000"
                value={return_value}
                onChange={(e) => setReturnValue(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Time Period: ${years} year(s)`}>
              <input
                type="range"
                min="1"
                max="20"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">ROI</p>
                <p className={`text-4xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi.toFixed(2)}%
                </p>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Annual ROI
                </p>
                <p className={`text-4xl font-bold ${annualROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {annualROI.toFixed(2)}%
                </p>
              </div>
            </ToolCard>
          </div>

          <ToolCard title="Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Investment
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  ${investment.toLocaleString()}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded ${return_value >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Profit/Loss
                </span>
                <span className={`font-mono font-bold ${return_value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${return_value.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Total Value
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  ${totalReturn.toLocaleString()}
                </span>
              </div>
            </div>
          </ToolCard>

          <ToolCard title="Formula">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
              ROI = (Net Profit / Investment) × 100
            </p>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
