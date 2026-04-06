'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function JSONFormatter() {
  const [input, setInput] = useState('{"name":"John","age":30,"city":"New York"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const formatJSON = (json: string, space: number) => {
    try {
      setError('');
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, space);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      return '';
    }
  };

  const minifyJSON = (json: string) => {
    try {
      setError('');
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      return '';
    }
  };

  const handleFormat = () => {
    setOutput(formatJSON(input, indent));
  };

  const handleMinify = () => {
    setOutput(minifyJSON(input));
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolTemplate
      title="JSON Formatter"
      description="Pretty print, minify, and validate JSON"
      icon="📄"
      onReset={() => {
        setInput('{"name":"John","age":30,"city":"New York"}');
        setOutput('');
        setError('');
        setIndent(2);
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <ToolCard title="Input JSON">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm resize-none"
            placeholder="Paste JSON here..."
          />
          {error && (
            <p className="text-red-600 text-sm mt-2">
              ⚠ {error}
            </p>
          )}
        </ToolCard>

        {/* Output */}
        <ToolCard title="Output">
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none"
            placeholder="Result will appear here..."
          />
        </ToolCard>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        <InputGroup label="Indent Size">
          <input
            type="number"
            min="1"
            max="8"
            value={indent}
            onChange={(e) => setIndent(parseInt(e.target.value) || 2)}
            className="w-24 p-2 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </InputGroup>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleFormat}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            Format
          </button>
          <button
            onClick={handleMinify}
            className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
          >
            Minify
          </button>
          <button
            onClick={validateJSON}
            className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
          >
            Validate
          </button>
          {output && (
            <button
              onClick={copyToClipboard}
              className="px-6 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition font-medium"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
