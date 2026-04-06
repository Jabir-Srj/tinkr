'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function FileSizeConverterPage() {
  const [bytes, setBytes] = useState(1048576);

  const sizes = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  const formatSize = (b: number) => {
    if (b < 1024) return `${b.toFixed(2)} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(2)} KB`;
    if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(2)} MB`;
    if (b < 1024 * 1024 * 1024 * 1024) return `${(b / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    return `${(b / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
  };

  return (
    <ToolTemplate
      title="File Size Converter"
      description="Convert between file size units"
      icon="💾"
      onReset={() => setBytes(1048576)}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Input">
            <InputGroup label={`Bytes: ${bytes.toLocaleString()}`}>
              <input
                type="range"
                min="0"
                max="1099511627776"
                step="1024"
                value={bytes}
                onChange={(e) => setBytes(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label="Direct Input">
              <input
                type="number"
                value={bytes}
                onChange={(e) => setBytes(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Conversions */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Conversions">
            <div className="space-y-3">
              {Object.entries(sizes).map(([unit, value]) => (
                <div
                  key={unit}
                  className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded"
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {unit}
                  </span>
                  <span className="font-mono text-gray-900 dark:text-gray-100">
                    {(bytes / value).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </ToolCard>

          <ToolCard title="Best Format">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Most Readable
              </p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {formatSize(bytes)}
              </p>
            </div>
          </ToolCard>

          <ToolCard title="Common Sizes">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-slate-900 rounded">
                <span>1 KB</span>
                <span className="font-mono">{sizes['KB']} bytes</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-slate-900 rounded">
                <span>1 MB</span>
                <span className="font-mono">{sizes['MB'].toLocaleString()} bytes</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-slate-900 rounded">
                <span>1 GB</span>
                <span className="font-mono">{sizes['GB'].toLocaleString()} bytes</span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
