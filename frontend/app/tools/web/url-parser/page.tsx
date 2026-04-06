'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function UrlParser() {
  const [url, setUrl] = useState('https://username:password@example.com:8080/path/to/page?key1=value1&key2=value2#section');
  const [parsed, setParsed] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parseUrl = () => {
    try {
      setError('');
      const urlObj = new URL(url);
      const params: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      setParsed({
        Protocol: urlObj.protocol,
        Hostname: urlObj.hostname,
        Port: urlObj.port || 'default',
        Username: urlObj.username || 'N/A',
        Password: urlObj.password ? '••••••••' : 'N/A',
        Pathname: urlObj.pathname,
        Search: urlObj.search || 'N/A',
        Hash: urlObj.hash || 'N/A',
        Origin: urlObj.origin,
        'Full URL': urlObj.href,
        ...params,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid URL';
      setError(msg);
      setParsed({});
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔗 URL Parser</h1>
            <p className="text-muted-foreground">Parse and analyze URL components</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">URL Input</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="https://example.com/path?query=value#hash"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {Object.keys(parsed).length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Parsed Components</label>
                <div className="border border-border rounded-lg bg-secondary-bg overflow-hidden">
                  <div className="max-h-96 overflow-y-auto space-y-2 p-4">
                    {Object.entries(parsed).map(([key, value], idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start gap-2 pb-2 border-b border-border/30 last:border-b-0"
                      >
                        <span className="text-sm font-medium text-muted-foreground min-w-fit">{key}:</span>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm font-mono break-all">{value}</span>
                          <button
                            onClick={() => copy(value)}
                            className="flex-shrink-0 p-1 hover:text-accent transition"
                            title="Copy value"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={parseUrl}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Parse
            </button>
            <button
              onClick={() => {
                setUrl('');
                setParsed({});
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
