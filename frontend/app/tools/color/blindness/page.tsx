'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function ColorBlindnessSimulatorPage() {
  const [bgColor, setBgColor] = useState('#FF0000');
  const [type, setType] = useState('protanopia');

  const simulateColorBlindness = (hex: string, blindnessType: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    let newR = r, newG = g, newB = b;

    if (blindnessType === 'protanopia') {
      newR = Math.round(0.567 * r + 0.433 * g);
      newG = Math.round(0.558 * r + 0.442 * g);
      newB = Math.round(0.242 * b);
    } else if (blindnessType === 'deuteranopia') {
      newR = Math.round(0.625 * r + 0.375 * g);
      newG = Math.round(0.7 * r + 0.3 * g);
      newB = Math.round(0.3 * b);
    } else if (blindnessType === 'tritanopia') {
      newR = Math.round(0.95 * r + 0.05 * g);
      newG = Math.round(0.433 * r + 0.567 * g);
      newB = Math.round(0.475 * g + 0.525 * b);
    }

    return `#${Math.min(255, newR).toString(16).padStart(2, '0')}${Math.min(255, newG).toString(16).padStart(2, '0')}${Math.min(255, newB).toString(16).padStart(2, '0')}`;
  };

  const simulated = simulateColorBlindness(bgColor, type);

  return (
    <ToolTemplate
      title="Color Blindness Simulator"
      description="Simulate color blindness perception"
      icon="👁️"
      onReset={() => {
        setBgColor('#FF0000');
        setType('protanopia');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Color">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
              />
            </InputGroup>

            <InputGroup label="Blindness Type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <option value="protanopia">Red-Blind (Protanopia)</option>
                <option value="deuteranopia">Green-Blind (Deuteranopia)</option>
                <option value="tritanopia">Blue-Yellow (Tritanopia)</option>
              </select>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ToolCard title="Normal Vision">
              <div
                className="h-48 rounded-lg border-2 border-gray-300 dark:border-slate-700"
                style={{ backgroundColor: bgColor }}
              />
              <p className="text-center font-mono text-sm mt-2">{bgColor}</p>
            </ToolCard>

            <ToolCard title={type.charAt(0).toUpperCase() + type.slice(1)}>
              <div
                className="h-48 rounded-lg border-2 border-gray-300 dark:border-slate-700"
                style={{ backgroundColor: simulated }}
              />
              <p className="text-center font-mono text-sm mt-2">{simulated}</p>
            </ToolCard>
          </div>

          <ToolCard title="Types of Color Blindness">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Protanopia:</strong> Red-blind (~1% of men)</li>
              <li><strong>Deuteranopia:</strong> Green-blind (~1% of men)</li>
              <li><strong>Tritanopia:</strong> Blue-yellow blind (~0.001%)</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
