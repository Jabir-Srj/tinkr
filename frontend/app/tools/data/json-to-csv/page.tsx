'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function JsonToCsv() {
  const [input, setInput] = useState('[{"name":"John","age":30,"email":"john@example.com"},{"name":"Jane","age":25,"email":"jane@example.com"}]');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const jsonToCsv = (json: string) => {
    try {
      setError('');
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) throw new Error('JSON must be an array of objects');

      const headers = Object.keys(data[0]);
      const csv = [
        headers.join(','),
        ...data.map(row =>
          headers
            .map(header => {
              const value = row[header];
              if (value === null || value === undefined) return '';
              if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
              return value;
            })
            .join(',')
        ),
      ].join('\n');

      return csv;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Conversion failed';
      setError(msg);
      return '';
    }
  };

  const handleConvert = () => {
    const result = jsonToCsv(input);
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'data.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📋 JSON to CSV</h1>
            <p className="text-muted-foreground">Convert JSON to CSV format instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">JSON Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste JSON array here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">CSV Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="CSV output will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Error: {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Convert
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
