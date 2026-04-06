'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { CheckCircle, XCircle } from 'lucide-react';

export default function UUIDValidatorPage() {
  const [uuid, setUuid] = useState('550e8400-e29b-41d4-a716-446655440000');

  const validateUUID = (uuid: string): boolean => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  const isValid = validateUUID(uuid);
  const parts = uuid.split('-');

  return (
    <ToolTemplate
      title="UUID Validator"
      description="Validate UUID format"
      icon="✔️"
      onReset={() => setUuid('550e8400-e29b-41d4-a716-446655440000')}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Input">
            <InputGroup label="UUID">
              <input
                type="text"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
                placeholder="Enter UUID..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {isValid ? (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-200">Valid UUID</p>
                  <p className="text-sm text-green-800 dark:text-green-300">
                    This is a valid UUID v4 format
                  </p>
                </div>
              </div>
            </ToolCard>
          ) : (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200">Invalid UUID</p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    This does not match valid UUID format
                  </p>
                </div>
              </div>
            </ToolCard>
          )}

          {isValid && (
            <>
              <ToolCard title="UUID Breakdown">
                <div className="space-y-2">
                  {parts.map((part, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-900 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Part {idx + 1}
                      </span>
                      <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                        {part}
                      </span>
                    </div>
                  ))}
                </div>
              </ToolCard>

              <ToolCard title="Format Info">
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Version: 4 (Random)</li>
                  <li>• Format: 8-4-4-4-12 hex digits</li>
                  <li>• Total: 36 characters (32 + 4 dashes)</li>
                </ul>
              </ToolCard>
            </>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
