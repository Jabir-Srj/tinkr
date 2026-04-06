'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function URLEncoderPage() {
  const [text, setText] = useState('Hello World & Special Chars!');
  const [isEncoded, setIsEncoded] = useState(false);

  const encode = (str: string) => {
    return encodeURIComponent(str);
  };

  const decode = (str: string) => {
    try {
      return decodeURIComponent(str);
    } catch {
      return 'Invalid URL encoding';
    }
  };

  const result = isEncoded ? encode(text) : text;
  const decoded = isEncoded ? text : decode(text);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <ToolTemplate
      title="URL Encoder/Decoder"
      description="Encode and decode URL-safe strings"
      icon="🔗"
      onReset={() => {
        setText('Hello World & Special Chars!');
        setIsEncoded(false);
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <ToolCard title="Input">
            <InputGroup label={isEncoded ? 'Encoded Text' : 'Original Text'}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                placeholder={isEncoded ? 'Paste encoded text...' : 'Enter text to encode...'}
              />
            </InputGroup>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEncoded(false)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                  !isEncoded
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setIsEncoded(true)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                  isEncoded
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Decode
              </button>
            </div>
          </ToolCard>
        </div>

        {/* Output */}
        <div>
          <ToolCard title="Output">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white min-h-32 break-all font-mono text-sm flex items-center">
                {result}
              </div>
              <button
                onClick={() => copyToClipboard(result)}
                className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
              >
                <Copy size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <ToolCard title="Statistics">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Length</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{text.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {isEncoded ? 'Encoded' : 'Decoded'} Length
                    </span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{result.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Reduction</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {text.length > 0 ? Math.round(((text.length - result.length) / text.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </ToolCard>

              <ToolCard title="Special Characters">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  URL encoding converts: spaces, &, ?, #, @, ! and other special characters
                </p>
              </ToolCard>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
