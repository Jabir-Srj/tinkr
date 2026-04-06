'use client';

import { useState } from 'react';
import { Copy, ArrowRightLeft } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function HexEncoder() {
  const [input, setInput] = useState('Hello, World!');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeHex = (text: string) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
  };

  const decodeHex = (hex: string) => {
    const cleanHex = hex.replace(/\s/g, '');
    let result = '';
    for (let i = 0; i < cleanHex.length; i += 2) {
      const code = parseInt(cleanHex.substr(i, 2), 16);
      if (isNaN(code)) throw new Error('Invalid hex');
      result += String.fromCharCode(code);
    }
    return result;
  };

  const handleEncode = () => {
    try {
      setOutput(encodeHex(input));
    } catch (err) {
      setOutput('Error encoding');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeHex(input));
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
            <h1 className="text-3xl font-bold mb-2">🔢 Hex Encoder</h1>
            <p className="text-muted-foreground">Encode and decode hexadecimal</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Text or hex to convert..."
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
