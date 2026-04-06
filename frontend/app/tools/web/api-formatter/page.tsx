'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ApiResponseFormatter() {
  const [input, setInput] = useState('{"status":200,"data":{"name":"John","age":30},"message":"Success"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [format, setFormat] = useState('json');
  const [indent, setIndent] = useState('2');
  const [copied, setCopied] = useState(false);

  const format_response = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);

      let formatted = '';
      if (format === 'json') {
        formatted = JSON.stringify(parsed, null, parseInt(indent));
      } else if (format === 'minify') {
        formatted = JSON.stringify(parsed);
      } else if (format === 'table') {
        // Convert to table format
        formatted = formatAsTable(parsed);
      }

      setOutput(formatted);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Formatting failed';
      setError(msg);
      setOutput('');
    }
  };

  const formatAsTable = (obj: any): string => {
    const lines: string[] = [];

    const formatValue = (val: any, depth: number = 0): string => {
      const indent = '  '.repeat(depth);
      if (typeof val === 'object' && val !== null) {
        if (Array.isArray(val)) {
          return `[${val.length} items]`;
        }
        return '{object}';
      }
      return String(val);
    };

    const addEntries = (obj: any, depth: number = 0) => {
      const indent = '  '.repeat(depth);
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          lines.push(`${indent}${key}:`);
          addEntries(value, depth + 1);
        } else {
          lines.push(`${indent}${key}: ${formatValue(value)}`);
        }
      });
    };

    addEntries(obj);
    return lines.join('\n');
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'response.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📋 API Response Formatter</h1>
            <p className="text-muted-foreground">Format and analyze API responses</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  <option value="json">Pretty JSON</option>
                  <option value="minify">Minified</option>
                  <option value="table">Table</option>
                </select>
              </div>

              {format === 'json' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Indentation</label>
                  <select
                    value={indent}
                    onChange={(e) => setIndent(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  >
                    <option value="2">2 spaces</option>
                    <option value="4">4 spaces</option>
                    <option value="8">8 spaces</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">API Response</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder='{"key": "value"}'
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

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={format_response}
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
