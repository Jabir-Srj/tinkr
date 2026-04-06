'use client';

import { useState } from 'react';
import { Copy, ArrowRightLeft } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function Rot13() {
  const [input, setInput] = useState('Hello, World!');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const rot13 = (text: string) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + ((char.charCodeAt(0) - start + 13) % 26));
    });
  };

  const handleEncode = () => {
    setOutput(rot13(input));
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
            <h1 className="text-3xl font-bold mb-2">🔐 ROT13 Encoder</h1>
            <p className="text-muted-foreground">Encode/decode text using ROT13 cipher</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Text to encode..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono resize-none focus:outline-none"
                placeholder="Result will appear here..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEncode}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Encode/Decode
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
