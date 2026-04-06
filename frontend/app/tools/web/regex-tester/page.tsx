'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function RegexTester() {
  const [pattern, setPattern] = useState('^[a-z]+@[a-z]+\\.[a-z]+$');
  const [text, setText] = useState('test@example.com\ninvalid-email\nuser@domain.org');
  const [flags, setFlags] = useState('gm');
  const [matches, setMatches] = useState<Array<{ text: string; index: number }>>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const testRegex = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const matchArray: Array<{ text: string; index: number }> = [];
      let match;

      // For global flag
      if (flags.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          matchArray.push({ text: match[0], index: match.index });
        }
      } else {
        match = text.match(regex);
        if (match) {
          matchArray.push({ text: match[0], index: text.indexOf(match[0]) });
        }
      }

      setMatches(matchArray);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid regex';
      setError(msg);
      setMatches([]);
    }
  };

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  const copy = () => {
    const results = matches.map((m) => m.text).join('\n');
    navigator.clipboard.writeText(results);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightMatches = () => {
    let html = text;
    const regex = new RegExp(`(${pattern})`, 'gm');
    html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(regex, '<mark style="background: rgba(52, 152, 219, 0.3);">$1</mark>');
    return html;
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🧪 Regex Tester</h1>
            <p className="text-muted-foreground">Test regular expressions with live matching</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Pattern</label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter regex pattern..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Flags</label>
              <div className="flex gap-3 flex-wrap">
                {[
                  { flag: 'g', label: 'Global', title: 'Find all matches' },
                  { flag: 'i', label: 'Ignore Case', title: 'Case-insensitive' },
                  { flag: 'm', label: 'Multiline', title: 'Multiline mode' },
                  { flag: 's', label: 'Dotall', title: 'Dot matches newlines' },
                ].map(({ flag, label, title }) => (
                  <button
                    key={flag}
                    onClick={() => toggleFlag(flag)}
                    title={title}
                    className={`px-3 py-2 rounded-lg border transition ${
                      flags.includes(flag)
                        ? 'bg-accent text-white border-accent'
                        : 'bg-secondary-bg text-foreground border-border hover:bg-border'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Test Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Enter text to test..."
                />
              </div>

              {matches.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Matches ({matches.length})</label>
                  <div className="w-full h-48 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm overflow-y-auto space-y-1">
                    {matches.map((match, idx) => (
                      <div key={idx} className="p-2 bg-green-500/10 border border-green-500/30 rounded text-green-300">
                        {match.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={testRegex}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Test
            </button>
            {matches.length > 0 && (
              <button
                onClick={copy}
                className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
              >
                <Copy size={16} /> Copy
              </button>
            )}
            <button
              onClick={() => {
                setPattern('');
                setText('');
                setMatches([]);
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
