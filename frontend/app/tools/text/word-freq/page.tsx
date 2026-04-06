'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function WordFrequencyAnalyzer() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. The dog was very lazy.');
  const [minLength, setMinLength] = useState('1');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState<Array<[string, number]>>([]);
  const [copied, setCopied] = useState(false);

  const analyzeFrequency = () => {
    const words = text
      .toLowerCase()
      .match(/\b\w+\b/g) || [];

    const minLen = parseInt(minLength) || 1;
    const filtered = words.filter((word) => word.length >= minLen);

    const frequency: Record<string, number> = {};
    filtered.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    setResult(sorted);
  };

  const copy = () => {
    const csv = result.map(([word, count]) => `${word},${count}`).join('\n');
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const csv = result.map(([word, count]) => `${word},${count}`).join('\n');
    const element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    element.download = 'word-frequency.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📊 Word Frequency Analyzer</h1>
            <p className="text-muted-foreground">Analyze word frequency in text</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Text Input</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-40 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter text to analyze..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Minimum Word Length</label>
                <input
                  type="number"
                  value={minLength}
                  onChange={(e) => setMinLength(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Options</label>
                <label className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg bg-secondary-bg cursor-pointer hover:bg-border transition">
                  <input
                    type="checkbox"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                  />
                  <span>Case Sensitive</span>
                </label>
              </div>
            </div>

            {result.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Results</label>
                <div className="border border-border rounded-lg bg-secondary-bg overflow-hidden">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-border/50 font-medium text-sm sticky top-0">
                    <div>Word</div>
                    <div className="text-right">Frequency</div>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-2 p-4">
                    {result.slice(0, 100).map(([word, count], idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-4 text-sm py-1 border-b border-border/30 last:border-b-0">
                        <div className="font-mono">{word}</div>
                        <div className="text-right font-mono font-bold text-accent">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={analyzeFrequency}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Analyze
            </button>
            {result.length > 0 && (
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
                  <Download size={16} /> CSV
                </button>
              </>
            )}
            <button
              onClick={() => {
                setText('');
                setResult([]);
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
