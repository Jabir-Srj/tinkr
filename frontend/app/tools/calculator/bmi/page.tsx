'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [unit, setUnit] = useState('metric');

  const getBMI = () => {
    const h = unit === 'metric' ? height / 100 : height * 0.0254;
    const w = weight;
    return (w / (h * h)).toFixed(1);
  };

  const getCategory = () => {
    const bmi = parseFloat(getBMI());
    if (bmi < 18.5) return { name: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { name: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { name: 'Overweight', color: 'text-yellow-600' };
    return { name: 'Obese', color: 'text-red-600' };
  };

  const bmi = getBMI();
  const category = getCategory();

  return (
    <ToolTemplate
      title="BMI Calculator"
      description="Calculate Body Mass Index"
      icon="⚖️"
      onReset={() => {
        setWeight(70);
        setHeight(175);
        setUnit('metric');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Details">
            <InputGroup label="Unit System">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, in)</option>
              </select>
            </InputGroup>

            <InputGroup label={`Weight: ${weight}${unit === 'metric' ? 'kg' : 'lbs'}`}>
              <input
                type="range"
                min={unit === 'metric' ? '30' : '60'}
                max={unit === 'metric' ? '200' : '440'}
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Height: ${height}${unit === 'metric' ? 'cm' : 'in'}`}>
              <input
                type="range"
                min={unit === 'metric' ? '120' : '48'}
                max={unit === 'metric' ? '220' : '84'}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">BMI</p>
              <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {bmi}
              </p>
              <p className={`text-xl font-semibold ${category.color}`}>
                {category.name}
              </p>
            </div>
          </ToolCard>

          <ToolCard title="BMI Categories">
            <div className="space-y-2">
              {[
                { range: 'Below 18.5', name: 'Underweight', color: 'bg-blue-100 dark:bg-blue-900' },
                { range: '18.5 - 24.9', name: 'Normal', color: 'bg-green-100 dark:bg-green-900' },
                { range: '25 - 29.9', name: 'Overweight', color: 'bg-yellow-100 dark:bg-yellow-900' },
                { range: '30+', name: 'Obese', color: 'bg-red-100 dark:bg-red-900' },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className={`p-3 rounded-lg ${cat.color}`}
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {cat.range}
                  </p>
                </div>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
