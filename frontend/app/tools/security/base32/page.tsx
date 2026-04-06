'use client';

import { useState } from 'react';
import { Copy, ArrowRightLeft } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function Base32Encoder() {
  const [input, setInput] = useState('Hello');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const encodeBase32 = (text: string) => {
    let bits = '';
    for (let i = 0; i < text.length; i++) {
      bits += text.charCodeAt(i).toString(2).padStart(8, '0');
    }

    let result = '';
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.substr(i, 5).padEnd(5, '0');
      result += BASE32_ALPHABET[parseInt(chunk, 2)];
    }

    const padding = (8 - (result.length % 8)) % 8;
    return result + '='.repeat(padding);
  };

  const decodeBase32 = (text: string) => {
    text = text.replace(/=/g, '');
    let bits = '';

    for (let i = 0; i < text.length; i++) {
      const index = BASE32_ALPHABET.indexOf(text[i]);
      if (index === -1) throw new Error('Invalid Base32 character');
      bits += index.toString(2).padStart(5, '0');
    }

    let result = '';
    for (let i = 0; i < bits.length; i += 8) {
      const chunk = bits.substr(i, 8);
      if (chunk.length === 8) {
        result += String.fromCharCode(parseInt(chunk, 2));
      }
    }
    return result;
  };

  const handleEncode = () => {
    try {
      setOutput(encodeBase32(input));
    } catch (err) {
      setOutput('Error encoding');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeBase32(input));
    } catch (err) {
      setOutput('Error decoding');
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔐 Base32 Encoder</h1>
            <p className="text-muted-foreground">Encode and decode Base32</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Text or Base32 to convert..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="Result will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEncode}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Encode
            </button>
            <button
              onClick={handleDecode}
              className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
            >
              Decode
            </button>
            <button
              onClick={swap}
              className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition flex items-center gap-2 font-medium"
            >
              <ArrowRightLeft size={16} /> Swap
            </button>
            {output && (
              <button
                onClick={copy}
                className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
              >
                <Copy size={16} /> Copy
              </button>
            )}
            <button
              onClick={() => {
                setInput('');
                setOutput('');
              }}
              className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
