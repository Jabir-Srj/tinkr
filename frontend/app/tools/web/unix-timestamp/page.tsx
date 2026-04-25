'use client';

import { useState, useEffect } from 'react';
import ToolTemplate from '@/components/ToolTemplate';

const FORMATS = [
  { label: 'ISO 8601', fn: (d: Date) => d.toISOString() },
  { label: 'UTC', fn: (d: Date) => d.toUTCString() },
  { label: 'Local', fn: (d: Date) => d.toLocaleString() },
  { label: 'Date only', fn: (d: Date) => d.toLocaleDateString() },
  { label: 'Time only', fn: (d: Date) => d.toLocaleTimeString() },
  { label: 'RFC 2822', fn: (d: Date) => d.toString() },
];

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="text-xs px-2 py-0.5 border border-border shrink-0 transition-colors"
      style={{ color: 'var(--muted-foreground)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
    >
      {copied ? '[copied!]' : '[copy]'}
    </button>
  );
}

export default function UnixTimestamp() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [live, setLive] = useState(true);
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [tsResult, setTsResult] = useState<Date | null>(null);
  const [dateResult, setDateResult] = useState<number | null>(null);
  const [tsError, setTsError] = useState('');
  const [dateError, setDateError] = useState('');

  // Live clock
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, [live]);

  // Timestamp → Date
  const convertTs = (val: string) => {
    setTsInput(val);
    setTsError('');
    setTsResult(null);
    if (!val.trim()) return;
    const n = Number(val.trim());
    if (isNaN(n)) { setTsError('Not a valid number'); return; }
    // auto-detect ms vs seconds
    const ms = n > 1e12 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setTsError('Timestamp out of range'); return; }
    setTsResult(d);
  };

  // Date → Timestamp
  const convertDate = (val: string) => {
    setDateInput(val);
    setDateError('');
    setDateResult(null);
    if (!val.trim()) return;
    const d = new Date(val);
    if (isNaN(d.getTime())) { setDateError('Cannot parse date — try ISO format: 2024-01-15T08:30:00'); return; }
    setDateResult(Math.floor(d.getTime() / 1000));
  };

  const nowDate = new Date(now * 1000);

  return (
    <ToolTemplate
      title="Unix Timestamp"
      description="Convert between Unix timestamps and human dates"
      icon="⏱️"
      onReset={() => {
        setTsInput(''); setDateInput(''); setTsResult(null);
        setDateResult(null); setTsError(''); setDateError('');
      }}
    >
      <div className="space-y-4 max-w-3xl mx-auto">

        {/* Live Clock */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>CURRENT UNIX TIMESTAMP</span>
              {live && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
            </div>
            <button
              onClick={() => setLive((l) => !l)}
              className="text-xs px-2 py-0.5 border border-border transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              {live ? '[pause]' : '[resume]'}
            </button>
          </div>
          <div className="px-4 py-5 text-center">
            <div className="font-mono text-4xl font-bold tracking-widest" style={{ color: 'var(--accent)' }}>
              {now.toLocaleString()}
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {nowDate.toUTCString()}
            </div>
            <div className="mt-3">
              <CopyBtn text={String(now)} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Timestamp → Date */}
          <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="px-3 py-1.5 border-b border-border">
              <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>TIMESTAMP → DATE</span>
            </div>
            <div className="p-3 space-y-3">
              <div className="flex items-center border border-border">
                <span className="px-2 text-xs border-r border-border py-1.5" style={{ color: 'var(--accent)' }}>❯</span>
                <input
                  type="text"
                  value={tsInput}
                  onChange={(e) => convertTs(e.target.value)}
                  placeholder="1716239022 or 1716239022000"
                  className="flex-1 bg-transparent px-2 py-1.5 text-xs font-mono focus:outline-none"
                  style={{ color: 'var(--foreground)' }}
                />
                <button
                  onClick={() => convertTs(String(now))}
                  className="text-xs px-2 py-1.5 border-l border-border transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  now
                </button>
              </div>
              {tsError && <p className="text-xs" style={{ color: '#f87171' }}>✗ {tsError}</p>}
              {tsResult && (
                <div className="space-y-1">
                  {FORMATS.map(({ label, fn }) => (
                    <div key={label} className="flex items-center justify-between gap-2 py-1 border-b border-border last:border-0">
                      <span className="text-xs shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                      <span className="text-xs font-mono truncate" style={{ color: 'var(--foreground)' }}>{fn(tsResult)}</span>
                      <CopyBtn text={fn(tsResult)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date → Timestamp */}
          <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="px-3 py-1.5 border-b border-border">
              <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>DATE → TIMESTAMP</span>
            </div>
            <div className="p-3 space-y-3">
              <div className="flex items-center border border-border">
                <span className="px-2 text-xs border-r border-border py-1.5" style={{ color: 'var(--accent)' }}>❯</span>
                <input
                  type="text"
                  value={dateInput}
                  onChange={(e) => convertDate(e.target.value)}
                  placeholder="2024-05-21T00:00:00Z"
                  className="flex-1 bg-transparent px-2 py-1.5 text-xs font-mono focus:outline-none"
                  style={{ color: 'var(--foreground)' }}
                />
              </div>
              {dateError && <p className="text-xs" style={{ color: '#f87171' }}>✗ {dateError}</p>}
              {dateResult !== null && (
                <div className="space-y-2">
                  {[
                    { label: 'seconds', val: String(dateResult) },
                    { label: 'milliseconds', val: String(dateResult * 1000) },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between gap-2 py-1 border-b border-border last:border-0">
                      <span className="text-xs shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                      <span className="font-mono text-sm font-bold flex-1 text-right" style={{ color: 'var(--accent)' }}>{Number(val).toLocaleString()}</span>
                      <CopyBtn text={val} />
                    </div>
                  ))}
                  <div className="pt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    = {new Date(dateResult * 1000).toUTCString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick reference */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border">
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>QUICK REFERENCE</span>
          </div>
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Epoch', ts: 0 },
              { label: 'Y2K', ts: 946684800 },
              { label: 'Unix max (32-bit)', ts: 2147483647 },
              { label: 'Year 3000', ts: 32503680000 },
            ].map(({ label, ts }) => (
              <button
                key={label}
                onClick={() => convertTs(String(ts))}
                className="text-left p-2 border border-border transition-colors hover:border-accent"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{label}</div>
                <div className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{ts.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
