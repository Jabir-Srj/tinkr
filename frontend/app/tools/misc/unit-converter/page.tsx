'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';

const conversions = {
  length: {
    name: 'Length',
    units: {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      inch: 25.4,
      foot: 304.8,
      yard: 914.4,
      mile: 1609344,
    },
  },
  weight: {
    name: 'Weight',
    units: {
      mg: 1,
      g: 1000,
      kg: 1000000,
      oz: 28349.5,
      lb: 453592,
    },
  },
  temperature: {
    name: 'Temperature',
    units: { celsius: 'C', fahrenheit: 'F', kelvin: 'K' },
  },
  volume: {
    name: 'Volume',
    units: {
      ml: 1,
      l: 1000,
      gallon: 3785.41,
      pint: 473.176,
      cup: 236.588,
    },
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<keyof typeof conversions>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  const convert = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return '0';

    const conv = conversions[category];
    const units = conv.units as Record<string, number>;

    if (category === 'temperature') {
      // Handle temperature conversion
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return ((num * 9) / 5 + 32).toFixed(4);
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return (((num - 32) * 5) / 9).toFixed(4);
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        return (num + 273.15).toFixed(4);
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        return (num - 273.15).toFixed(4);
      }
      return num.toFixed(4);
    }

    const fromFactor = units[fromUnit];
    const toFactor = units[toUnit];
    const result = (num * fromFactor) / toFactor;

    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const categoryOptions = Object.entries(conversions).map(([key, val]) => ({
    value: key,
    label: val.name,
  }));

  const unitOptions = Object.keys(conversions[category].units);

  return (
    <ToolTemplate
      title="Unit Converter"
      description="Convert between different units of measurement"
      icon="🔄"
      onReset={() => {
        setInputValue('1');
        setCategory('length');
        setFromUnit('m');
        setToUnit('km');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Convert From">
            <InputGroup label="Category">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as keyof typeof conversions);
                  setFromUnit(Object.keys(conversions[e.target.value as keyof typeof conversions].units)[0]);
                  setToUnit(Object.keys(conversions[e.target.value as keyof typeof conversions].units)[1]);
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </InputGroup>

            <InputGroup label="Value">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <InputGroup label="From Unit">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <ToolCard title="Convert To">
            <InputGroup label="To Unit">
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </InputGroup>

            <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg text-white">
              <p className="text-sm opacity-90 mb-2">Result</p>
              <div className="text-5xl font-bold font-mono break-words">
                {convert()}
              </div>
              <p className="text-sm opacity-75 mt-2">
                {inputValue} {fromUnit} = {convert()} {toUnit}
              </p>
            </div>

            {/* Common Conversions */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Reference</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                {category === 'length' && (
                  <>
                    <div>1 km = 1000 m</div>
                    <div>1 mile ≈ 1.61 km</div>
                    <div>1 inch ≈ 2.54 cm</div>
                    <div>1 foot ≈ 0.305 m</div>
                  </>
                )}
                {category === 'weight' && (
                  <>
                    <div>1 kg = 1000 g</div>
                    <div>1 lb ≈ 0.453 kg</div>
                    <div>1 oz ≈ 28.35 g</div>
                    <div>1 ton = 1000 kg</div>
                  </>
                )}
                {category === 'temperature' && (
                  <>
                    <div>0°C = 32°F</div>
                    <div>100°C = 212°F</div>
                    <div>0°C = 273.15 K</div>
                    <div>-40°C = -40°F</div>
                  </>
                )}
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
