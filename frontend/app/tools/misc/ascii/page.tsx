'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup, OutputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function ASCIICodePage() {
  const [inputChar, setInputChar] = useState('A');
  const [asciiCode, setAsciiCode] = useState(65);

  const handleCharInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.charAt(0) || '';
    setInputChar(char);
    if (char) {
      setAsciiCode(char.charCodeAt(0));
    }
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = parseInt(e.target.value) || 0;
    setAsciiCode(code);
    if (code >= 0 && code <= 127) {
      setInputChar(String.fromCharCode(code));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="ASCII Code Lookup"
      description="Convert between characters and ASCII codes"
      icon="🔤"
      onReset={() => {
        setInputChar('A');
        setAsciiCode(65);
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <ToolCard title="Input">
            <InputGroup label="Character">
              <input
                type="text"
                maxLength={1}
                value={inputChar}
                onChange={handleCharInput}
                placeholder="Enter a character"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl text-center font-bold"
              />
            </InputGroup>

            <InputGroup label="ASCII Code (0-127)">
              <input
                type="number"
                min="0"
                max="127"
                value={asciiCode}
                onChange={handleCodeInput}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>
          </ToolCard>
        </div>

        <div className="space-y-4">
          <ToolCard title="Character Details">
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border border-border text-center">
              <p className="text-xs text-blue-600 dark:text-blue-300 mb-1">Character</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">{inputChar || '—'}</p>
              <p className="text-xs text-blue-600 dark:text-blue-300">ASCII: {asciiCode}</p>
            </div>
          </ToolCard>

          <ToolCard title="Reference">
            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Common Codes:</strong></p>
              <ul className="text-xs space-y-1 ml-2">
                <li>32: Space</li>
                <li>48-57: Digits (0-9)</li>
                <li>65-90: Uppercase (A-Z)</li>
                <li>97-122: Lowercase (a-z)</li>
              </ul>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
