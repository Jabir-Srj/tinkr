'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function PxRemConverterPage() {
  const [px, setPx] = useState(16);
  const [baseSize, setBaseSize] = useState(16);

  const rem = (px / baseSize).toFixed(4);

  const convertToRem = (pxValue: number) => (pxValue / baseSize).toFixed(4);

  const commonSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="PX to REM Converter"
      description="Convert pixel values to rem units"
      icon="📐"
      onReset={() => {
        setPx(16);
        setBaseSize(16);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Base Font Size (px)">
              <input
                type="number"
                value={baseSize}
                onChange={(e) => setBaseSize(parseInt(e.target.value) || 16)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">Usually 16px (default browser size)</p>
            </InputGroup>

            <InputGroup label="Pixels to Convert">
              <input
                type="number"
                value={px}
                onChange={(e) => setPx(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Conversion */}
          <ToolCard>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Pixels</p>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-200">{px}px</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-lg">
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-2">Rem</p>
                <p className="text-4xl font-bold text-teal-900 dark:text-teal-200">{rem}rem</p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(`${rem}rem`)}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Copy size={16} className="inline mr-2" />
              Copy Result
            </button>
          </ToolCard>

          {/* Common Sizes */}
          <ToolCard title="Common Sizes (with base {baseSize}px)">
            <div className="grid grid-cols-2 gap-2">
              {commonSizes.map((size) => (
                <div
                  key={size}
                  className="flex items-center justify-between p-2 bg-gray-100 dark:bg-slate-900 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800"
                  onClick={() => {
                    setPx(size);
                    copyToClipboard(`${convertToRem(size)}rem`);
                  }}
                >
                  <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {size}px
                  </span>
                  <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                    {convertToRem(size)}rem
                  </span>
                </div>
              ))}
            </div>
          </ToolCard>

          <ToolCard title="Why REM?">
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>• Scales with user font size preferences</li>
              <li>• Better for responsive design</li>
              <li>• Easier to maintain</li>
              <li>• 1rem = base font size (usually 16px)</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
