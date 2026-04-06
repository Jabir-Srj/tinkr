'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function BinaryTranslatorPage() {
  const [text, setText] = useState('Hello');
  const [binary, setBinary] = useState('01001000 01100101 01101100 01101100 01101111');

  const textToBinary = (str: string) => {
    return str
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (bin: string) => {
    return bin
      .split(/\s+/)
      .map(byte => String.fromCharCode(parseInt(byte, 2)))
      .join('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setBinary(textToBinary(value));
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBinary(value);
    try {
      setText(binaryToText(value));
    } catch (error) {
      setText('[Invalid binary]');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Binary Translator"
      description="Convert text to binary and vice versa"
      icon="0️⃣"
      onReset={() => {
        setText('Hello');
        setBinary('01001000 01100101 01101100 01101100 01101111');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <ToolCard title="Text Input">
          <InputGroup label="Text">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 font-mono"
            />
          </InputGroup>
          <button
            onClick={() => copyToClipboard(text)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
          >
            <Copy size={16} />
            Copy Text
          </button>
        </ToolCard>

        <ToolCard title="Binary Output">
          <InputGroup label="Binary (8-bit ASCII)">
            <textarea
              value={binary}
              onChange={handleBinaryChange}
              placeholder="Binary code..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 font-mono text-sm"
            />
          </InputGroup>
          <button
            onClick={() => copyToClipboard(binary)}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
          >
            <Copy size={16} />
            Copy Binary
          </button>
        </ToolCard>
      </div>

      <ToolCard title="Info">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          <strong>How it works:</strong> Each character is converted to 8-bit binary (ASCII). For example:
        </p>
        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400 ml-2">
          <li>• 'A' = 65 (decimal) = 01000001 (binary)</li>
          <li>• 'a' = 97 (decimal) = 01100001 (binary)</li>
          <li>• Space = 32 (decimal) = 00100000 (binary)</li>
        </ul>
      </ToolCard>
    </ToolTemplate>
  );
}
