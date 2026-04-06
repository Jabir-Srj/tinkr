'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, CheckCircle, XCircle } from 'lucide-react';

export default function URLValidatorPage() {
  const [url, setUrl] = useState('https://example.com');

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValid = validateURL(url);
  const urlObj = isValid ? new URL(url) : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="URL Validator"
      description="Validate and analyze URLs"
      icon="🌐"
      onReset={() => {
        setUrl('https://example.com');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="URL Input">
            <InputGroup label="URL">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Status & Details */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Validation Status */}
            {isValid ? (
              <ToolCard>
                <div className="flex gap-3 items-start">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-200">Valid URL</p>
                    <p className="text-sm text-green-800 dark:text-green-300">This is a valid URL</p>
                  </div>
                </div>
              </ToolCard>
            ) : (
              <ToolCard>
                <div className="flex gap-3 items-start">
                  <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-200">Invalid URL</p>
                    <p className="text-sm text-red-800 dark:text-red-300">This URL format is invalid</p>
                  </div>
                </div>
              </ToolCard>
            )}

            {/* URL Components */}
            {isValid && urlObj && (
              <ToolCard title="URL Components">
                <div className="space-y-3">
                  {[
                    { label: 'Protocol', value: urlObj.protocol.slice(0, -1) },
                    { label: 'Hostname', value: urlObj.hostname },
                    { label: 'Port', value: urlObj.port || 'Default' },
                    { label: 'Path', value: urlObj.pathname || '/' },
                    { label: 'Search', value: urlObj.search || 'None' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 bg-gray-100 dark:bg-slate-900 rounded flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
                        <p className="font-mono font-bold text-gray-900 dark:text-gray-100 break-all">
                          {item.value}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.value)}
                        className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </ToolCard>
            )}

            {/* Rules */}
            <ToolCard title="Validation Rules">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className={`flex items-center gap-2 ${url.startsWith('http://') || url.startsWith('https://') ? 'text-green-600' : ''}`}>
                  ✓ Must have protocol (http:// or https://)
                </li>
                <li className={`flex items-center gap-2 ${url.includes('.') ? 'text-green-600' : ''}`}>
                  ✓ Must have domain extension
                </li>
                <li className={`flex items-center gap-2 ${!url.includes(' ') ? 'text-green-600' : ''}`}>
                  ✓ No spaces allowed
                </li>
              </ul>
            </ToolCard>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
