'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function BarcodeGeneratorPage() {
  const [input, setInput] = useState('123456789012');
  const [barcodeType, setBarcodeType] = useState('code128');

  const generateBarcode = (): string => {
    const chars = input.replace(/[^0-9A-Z]/g, '');
    let barcode = '';

    if (barcodeType === 'code128') {
      barcode = chars.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    } else if (barcodeType === 'ean13') {
      barcode = chars.slice(0, 13);
    } else if (barcodeType === 'upca') {
      barcode = chars.slice(0, 12);
    }

    return barcode;
  };

  const barcode = generateBarcode();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Barcode Generator"
      description="Generate barcodes from text or numbers"
      icon="📊"
      onReset={() => {
        setInput('123456789012');
        setBarcodeType('code128');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Input Data">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                placeholder="Enter numbers or letters..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
            </InputGroup>

            <InputGroup label="Barcode Type">
              <select
                value={barcodeType}
                onChange={(e) => setBarcodeType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="code128">Code 128</option>
                <option value="ean13">EAN-13</option>
                <option value="upca">UPC-A</option>
              </select>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <ToolCard title="Barcode Output">
            <div className="space-y-6">
              {/* Visual Barcode */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-8 border-2 border-gray-200 dark:border-slate-700">
                <div className="flex justify-center items-end h-32 gap-px">
                  {barcode.split('').map((bit, idx) => (
                    <div
                      key={idx}
                      className={`${bit === '1' ? 'bg-gray-900' : 'bg-white'} border border-gray-300 flex-1 h-full`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 font-mono break-all">
                  {input}
                </p>
              </div>

              {/* Data Display */}
              <div className="space-y-3">
                <div className="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Type</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{barcodeType.toUpperCase()}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Data</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-gray-900 dark:text-gray-100 break-all">{input}</p>
                    <button
                      onClick={() => copyToClipboard(input)}
                      className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Binary</p>
                  <p className="font-mono text-xs text-gray-900 dark:text-gray-100 break-all">{barcode}</p>
                </div>
              </div>

              <ToolCard title="Info">
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Code 128: Alphanumeric, numbers + letters</li>
                  <li>• EAN-13: 13-digit product code</li>
                  <li>• UPC-A: 12-digit product code</li>
                </ul>
              </ToolCard>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
