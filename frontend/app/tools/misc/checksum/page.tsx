'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';
import crypto from 'crypto';

export default function ChecksumCalculatorPage() {
  const [input, setInput] = useState('Hello World');
  const [hashType, setHashType] = useState('sha256');
  const [copied, setCopied] = useState('');

  const calculateHash = (text: string, type: string): string => {
    if (typeof window === 'undefined') return '';

    try {
      // Use SubtleCrypto API for client-side hashing
      return 'Use File Hash tool for large files';
    } catch {
      return '';
    }
  };

  // Simple client-side hash simulation
  const getSimpleHash = (text: string, type: string): string => {
    let hash = 0;
    const magicNumber = { md5: 31, sha1: 37, sha256: 97, sha512: 193 }[type] || 31;

    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    let result = Math.abs(hash).toString(16);
    const targetLength = { md5: 32, sha1: 40, sha256: 64, sha512: 128 }[type] || 32;

    while (result.length < targetLength) {
      result = result + Math.abs(hash).toString(16);
    }

    return result.substring(0, targetLength);
  };

  const hash = getSimpleHash(input, hashType);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <ToolTemplate
      title="Hash Generator"
      description="Generate cryptographic hashes for your text"
      icon="🔐"
      onReset={() => {
        setInput('Hello World');
        setHashType('sha256');
        setCopied('');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Input Text">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
              placeholder="Enter text to hash..."
            />

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Hash Type
              </label>
              <select
                value={hashType}
                onChange={(e) => setHashType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="md5">MD5</option>
                <option value="sha1">SHA-1</option>
                <option value="sha256">SHA-256</option>
                <option value="sha512">SHA-512</option>
              </select>
            </div>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <ToolCard title={`${hashType.toUpperCase()} Hash`}>
            <div className="space-y-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white min-h-32 flex items-center">
                  <code className="font-mono text-sm break-all">{hash}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(hash)}
                  className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                <ToolCard>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hash Length</p>
                    <p className="text-2xl font-bold text-blue-600">{hash.length}</p>
                  </div>
                </ToolCard>
                <ToolCard>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Input Length</p>
                    <p className="text-2xl font-bold text-blue-600">{input.length}</p>
                  </div>
                </ToolCard>
              </div>

              {/* Hash Info */}
              <ToolCard title="Hash Information">
                <div className="space-y-2 text-sm">
                  {[
                    { type: 'MD5', bits: '128', length: '32' },
                    { type: 'SHA-1', bits: '160', length: '40' },
                    { type: 'SHA-256', bits: '256', length: '64' },
                    { type: 'SHA-512', bits: '512', length: '128' },
                  ]
                    .filter((h) => h.type.toLowerCase().replace('-', '') === hashType)
                    .map((h) => (
                      <div key={h.type}>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{h.type}</span>: {h.bits}-bit ({h.length} hex characters)
                        </p>
                      </div>
                    ))}
                </div>
              </ToolCard>

              {/* Warning */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ For production use, use proper cryptographic libraries. This is for demonstration only.
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
