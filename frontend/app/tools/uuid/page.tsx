'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function UUIDGeneratorPage() {
  const [uuid, setUuid] = useState('');
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState('v4');
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUID = (): string => {
    if (version === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    return '';
  };

  const generate = () => {
    const generated = Array(count)
      .fill(null)
      .map(() => generateUUID());
    setUuids(generated);
    setUuid(generated[0]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\\n'));
  };

  return (
    <ToolTemplate
      title="UUID Generator"
      description="Generate unique universal identifiers"
      icon="🆔"
      onReset={() => {
        setUuid('');
        setUuids([]);
        setCount(1);
        setVersion('v4');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Number of UUIDs">
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <InputGroup label="UUID Version">
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="v4">Version 4 (Random)</option>
              </select>
            </InputGroup>

            <button
              onClick={generate}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Generate
            </button>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          {uuids.length > 0 ? (
            <div className="space-y-4">
              {/* First UUID Preview */}
              <ToolCard>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generated UUID</p>
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white font-mono text-lg break-all flex items-center min-h-20">
                      {uuid}
                    </div>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              </ToolCard>

              {/* Multiple UUIDs */}
              {count > 1 && (
                <ToolCard title={`Generated UUIDs (${uuids.length})`}>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {uuids.map((u, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-3 bg-gray-100 dark:bg-slate-900 rounded"
                      >
                        <code className="text-xs font-mono text-gray-900 dark:text-gray-100 flex-1 break-all">
                          {u}
                        </code>
                        <button
                          onClick={() => copyToClipboard(u)}
                          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={copyAll}
                    className="w-full mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition"
                  >
                    Copy All
                  </button>
                </ToolCard>
              )}

              {/* Information */}
              <ToolCard title="UUID v4 Information">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 128-bit identifier</li>
                  <li>• Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</li>
                  <li>• Random-based generation</li>
                  <li>• Universally unique across systems</li>
                  <li>• Perfect for IDs, tokens, and keys</li>
                </ul>
              </ToolCard>
            </div>
          ) : (
            <ToolCard>
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Click "Generate" to create UUIDs</p>
              </div>
            </ToolCard>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
