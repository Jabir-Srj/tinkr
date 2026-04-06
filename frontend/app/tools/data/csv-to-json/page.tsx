'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function CsvToJson() {
  const [input, setInput] = useState('name,age,email\nJohn,30,john@example.com\nJane,25,jane@example.com');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const csvToJson = (csv: string) => {
    try {
      setError('');
      const lines = csv.trim().split('\n');
      if (lines.length === 0) throw new Error('Empty CSV');

      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

      return JSON.stringify(data, null, 2);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Conversion failed';
      setError(msg);
      return '';
    }
  };

  const handleConvert = () => {
    const result = csvToJson(input);
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'data.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📊 CSV to JSON</h1>
            <p className="text-muted-foreground">Convert CSV to JSON format instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">CSV Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste CSV here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">JSON Output</label>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                  placeholder="JSON output will appear here..."
                />
              </div>
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
