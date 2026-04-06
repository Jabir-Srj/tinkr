'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function DiffChecker() {
  const [text1, setText1] = useState('The quick brown fox\njumps over the lazy dog');
  const [text2, setText2] = useState('The quick brown fox\njumps over the lazy cat');
  const [diff, setDiff] = useState<Array<{ type: string; content: string }>>([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: Array<{ type: string; content: string }> = [];

    const maxLen = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        result.push({ type: 'equal', content: line1 });
      } else {
        if (line1) result.push({ type: 'removed', content: line1 });
        if (line2) result.push({ type: 'added', content: line2 });
      }
    }

    setDiff(result);
  };

  const getStats = () => {
    const added = diff.filter((d) => d.type === 'added').length;
    const removed = diff.filter((d) => d.type === 'removed').length;
    const equal = diff.filter((d) => d.type === 'equal').length;
    return { added, removed, equal };
  };

  const stats = getStats();

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔍 Diff Checker</h1>
            <p className="text-muted-foreground">Compare two texts and see differences</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Text 1</label>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter first text..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Text 2</label>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter second text..."
              />
            </div>
          </div>

          {diff.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Added</div>
                  <div className="text-2xl font-bold text-green-400">{stats.added}</div>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Removed</div>
                  <div className="text-2xl font-bold text-red-400">{stats.removed}</div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Unchanged</div>
                  <div className="text-2xl font-bold text-blue-400">{stats.equal}</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Diff Result</label>
                <div className="p-4 border border-border rounded-lg bg-secondary-bg space-y-1 font-mono text-sm max-h-64 overflow-y-auto">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded ${
                        line.type === 'added'
                          ? 'bg-green-500/20 text-green-300'
                          : line.type === 'removed'
                          ? 'bg-red-500/20 text-red-300'
                          : 'text-foreground'
                      }`}
                    >
                      <span className="mr-2">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                      </span>
                      {line.content}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={calculateDiff}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Compare
            </button>
            <button
              onClick={() => {
                setText1('');
                setText2('');
                setDiff([]);
              }}
              className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
