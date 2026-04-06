'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { CheckCircle, XCircle, Copy } from 'lucide-react';

export default function JSONValidatorPage() {
  const [json, setJson] = useState(
    JSON.stringify(
      {
        name: 'John Doe',
        email: 'john@example.com',
        active: true,
        roles: ['admin', 'user'],
      },
      null,
      2
    )
  );
  const [error, setError] = useState('');
  const [formatted, setFormatted] = useState('');

  const validateJSON = (value: string) => {
    setJson(value);
    try {
      const parsed = JSON.parse(value);
      setError('');
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message);
      setFormatted('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed));
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const beautify = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      setError('');
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isValid = error === '';

  return (
    <ToolTemplate
      title="JSON Validator"
      description="Validate, format, and analyze JSON data"
      icon="📋"
      onReset={() => {
        setJson(JSON.stringify({ name: 'John Doe', email: 'john@example.com' }, null, 2));
        setError('');
        setFormatted('');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <ToolCard title="JSON Input">
            <textarea
              value={json}
              onChange={(e) => validateJSON(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-96"
              placeholder="Paste JSON here..."
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={minify}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-semibold"
              >
                Minify
              </button>
              <button
                onClick={beautify}
                className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition font-semibold"
              >
                Beautify
              </button>
            </div>
          </ToolCard>
        </div>

        {/* Status & Output */}
        <div className="space-y-4">
          {/* Status */}
          {isValid ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-200">Valid JSON</p>
                <p className="text-sm text-green-800 dark:text-green-300">No errors detected</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <XCircle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-200">Invalid JSON</p>
                <p className="text-sm text-red-800 dark:text-red-300 font-mono">{error}</p>
              </div>
            </div>
          )}

          {/* Formatted Output */}
          {formatted && (
            <ToolCard title="Formatted Output">
              <div className="relative">
                <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-gray-100 h-64 overflow-auto break-all whitespace-pre-wrap">
                  {formatted}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(formatted)}
                  className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <Copy size={16} />
                </button>
              </div>
            </ToolCard>
          )}

          {/* JSON Stats */}
          {isValid && (
            <ToolCard title="JSON Statistics">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                    {(json.length / 1024).toFixed(2)} KB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lines:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                    {json.split('\n').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                    {json.length}
                  </span>
                </div>
              </div>
            </ToolCard>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
