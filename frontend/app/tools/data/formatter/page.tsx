'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function DataFormatter() {
  const [input, setInput] = useState('{"name":"John","age":30,"email":"john@example.com"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState('2');
  const [minify, setMinify] = useState(false);

  const formatData = (data: string, indentSize: number, shouldMinify: boolean) => {
    try {
      setError('');
      const parsed = JSON.parse(data);
      if (shouldMinify) {
        return JSON.stringify(parsed);
      }
      return JSON.stringify(parsed, null, indentSize);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Formatting failed';
      setError(msg);
      return '';
    }
  };

  const handleFormat = () => {
    const result = formatData(input, parseInt(indent), minify);
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'formatted.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">✨ Data Formatter</h1>
            <p className="text-muted-foreground">Format and prettify JSON data</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Input Data</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste JSON here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Formatted Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="Formatted output will appear here..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Indentation</label>
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="8">8 spaces</option>
                <option value="1">Tab</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              <label className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-secondary-bg cursor-pointer hover:bg-border transition">
                <input
                  type="checkbox"
                  checked={minify}
                  onChange={(e) => setMinify(e.target.checked)}
                  className="cursor-pointer"
                />
                <span>Minify</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Error: {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleFormat}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Format
            </button>
            {output && (
              <>
                <button
                  onClick={copy}
                  className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={download}
                  className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition flex items-center gap-2 font-medium"
                >
                  <Download size={16} /> Download
                </button>
              </>
            )}
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
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
