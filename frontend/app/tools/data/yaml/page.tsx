'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function YamlParser() {
  const [input, setInput] = useState('name: John\nage: 30\nemail: john@example.com\naddress:\n  street: 123 Main St\n  city: New York');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parseYaml = (yaml: string) => {
    try {
      setError('');
      const lines = yaml.split('\n');
      const result: any = {};
      const stack: any[] = [result];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimLeft();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const indent = line.length - trimmed.length;
        const [key, value] = trimmed.split(':').map(s => s.trim());

        while (stack.length > 1 && indent <= (stack[stack.length - 1]._indent || 0)) {
          stack.pop();
        }

        const current = stack[stack.length - 1];

        if (value === undefined || value === '') {
          const obj = {};
          (obj as any)._indent = indent;
          current[key] = obj;
          stack.push(obj);
        } else {
          try {
            current[key] = JSON.parse(value);
          } catch {
            current[key] = value;
          }
        }
      }

      delete (result as any)._indent;
      return JSON.stringify(result, null, 2);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Parsing failed';
      setError(msg);
      return '';
    }
  };

  const handleParse = () => {
    const result = parseYaml(input);
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
            <h1 className="text-3xl font-bold mb-2">📝 YAML Parser</h1>
            <p className="text-muted-foreground">Parse and validate YAML to JSON</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">YAML Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste YAML here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">JSON Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="JSON output will appear here..."
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
              onClick={handleParse}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Parse
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
