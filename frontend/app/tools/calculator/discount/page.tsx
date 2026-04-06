'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;
  const savings = discountAmount;

  return (
    <ToolTemplate
      title="Discount Calculator"
      description="Calculate discounts and savings"
      icon="🏷️"
      onReset={() => {
        setOriginalPrice(100);
        setDiscountPercent(20);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Details">
            <InputGroup label={`Original Price: $${originalPrice.toFixed(2)}`}>
              <input
                type="range"
                min="1"
                max="10000"
                step="10"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Discount: ${discountPercent}%`}>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Discount Amount
                </p>
                <p className="text-4xl font-bold text-red-600">
                  ${discountAmount.toFixed(2)}
                </p>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Final Price</p>
                <p className="text-4xl font-bold text-green-600">
                  ${finalPrice.toFixed(2)}
                </p>
              </div>
            </ToolCard>
          </div>

          <ToolCard title="Savings Breakdown">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Original Price
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Discount ({discountPercent}%)
                </span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/30 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  You Pay
                </span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </ToolCard>

          <ToolCard title="Preset Discounts">
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 50].map((disc) => (
                <button
                  key={disc}
                  onClick={() => setDiscountPercent(disc)}
                  className={`py-2 rounded font-semibold transition text-sm ${
                    discountPercent === disc
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {disc}%
                </button>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
