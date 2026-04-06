'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Copy, ArrowRightLeft } from 'lucide-react';

export default function Base64Encoder() {
  const [input, setInput] = useState('Hello, World!');
  const [output, setOutput] = useState('');

  const encode = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch {
      return '';
    }
  };

  const decode = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch {
      return '';
    }
  };

  const handleEncode = () => {
    setOutput(encode(input));
  };

  const handleDecode = () => {
    setOutput(decode(input));
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolTemplate
      title="Base64 Encoder"
      description="Encode and decode Base64"
      icon="🔒"
      onReset={() => {
        setInput('Hello, World!');
        setOutput('');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <ToolCard title="Input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="Text or Base64 to convert..."
          />
        </ToolCard>

        {/* Output */}
        <ToolCard title="Output">
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none"
            placeholder="Result will appear here..."
          />
        </ToolCard>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
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
            onClick={copyToClipboard}
            className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
          >
            <Copy size={16} /> Copy
          </button>
        )}
      </div>
    </ToolTemplate>
  );
}
