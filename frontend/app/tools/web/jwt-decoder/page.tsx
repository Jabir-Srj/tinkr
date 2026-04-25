'use client';

import { useState, useCallback } from 'react';
import ToolTemplate from '@/components/ToolTemplate';

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
  try {
    return decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return atob(padded);
  }
}

function formatRelativeTime(ts: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = ts - now;
  const abs = Math.abs(diff);
  const sign = diff < 0 ? 'ago' : 'from now';
  if (abs < 60) return `${abs}s ${sign}`;
  if (abs < 3600) return `${Math.floor(abs / 60)}m ${sign}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)}h ${sign}`;
  return `${Math.floor(abs / 86400)}d ${sign}`;
}

function JsonView({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="font-mono text-xs leading-relaxed">
      {'{'}
      {Object.entries(data).map(([key, val], i) => {
        const isTimestamp = (key === 'exp' || key === 'iat' || key === 'nbf') && typeof val === 'number';
        const isExpired = key === 'exp' && typeof val === 'number' && val < Date.now() / 1000;
        return (
          <div key={i} className="ml-4">
            <span style={{ color: 'var(--muted-foreground)' }}>&quot;{key}&quot;</span>
            <span style={{ color: 'var(--foreground)' }}>: </span>
            <span style={{ color: 'var(--accent)' }}>
              {typeof val === 'string' ? `"${val}"` : JSON.stringify(val)}
            </span>
            {isTimestamp && typeof val === 'number' && (
              <span
                className="ml-2 text-xs px-1.5 py-0.5"
                style={{
                  backgroundColor: isExpired ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                  color: isExpired ? '#f87171' : '#4ade80',
                  border: `1px solid ${isExpired ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
                }}
              >
                {new Date(val * 1000).toUTCString()} · {formatRelativeTime(val)}
              </span>
            )}
          </div>
        );
      })}
      {'}'}
    </div>
  );
}

const EXAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphYmlyIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<Record<string, unknown> | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const decode = useCallback((raw: string) => {
    setError('');
    setHeader(null);
    setPayload(null);
    setSignature('');

    const parts = raw.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT — must have exactly 3 parts (header.payload.signature)');
      return;
    }
    try {
      setHeader(JSON.parse(base64UrlDecode(parts[0])));
      setPayload(JSON.parse(base64UrlDecode(parts[1])));
      setSignature(parts[2]);
    } catch {
      setError('Failed to decode JWT — malformed base64url or JSON');
    }
  }, []);

  const handleInput = (val: string) => {
    setToken(val);
    if (val.trim()) decode(val);
    else {
      setHeader(null);
      setPayload(null);
      setSignature('');
      setError('');
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const isExpired =
    payload && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000;

  const parts = token.trim().split('.');

  return (
    <ToolTemplate
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens"
      icon="🔑"
      onReset={() => handleInput('')}
    >
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Status badge */}
        {(header || error) && (
          <div
            className="inline-flex items-center gap-2 px-3 py-1 text-xs border font-mono"
            style={
              error
                ? { borderColor: 'rgba(239,68,68,0.4)', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.08)' }
                : isExpired
                ? { borderColor: 'rgba(251,191,36,0.4)', color: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)' }
                : { borderColor: 'rgba(34,197,94,0.4)', color: '#4ade80', backgroundColor: 'rgba(34,197,94,0.08)' }
            }
          >
            <span>{error ? '✗' : isExpired ? '⚠' : '✓'}</span>
            <span>{error ? 'INVALID' : isExpired ? 'EXPIRED' : 'VALID JWT'}</span>
          </div>
        )}

        {/* Token input with colored parts */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border flex items-center gap-2">
            <span style={{ color: 'var(--accent)' }} className="text-xs">❯</span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>paste jwt token</span>
            <button
              onClick={() => handleInput(EXAMPLE_JWT)}
              className="ml-auto text-xs px-2 py-0.5 border border-border transition-colors hover:border-accent"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              [load example]
            </button>
          </div>
          <textarea
            value={token}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            rows={4}
            className="w-full bg-transparent px-3 py-3 text-xs font-mono focus:outline-none resize-none"
            style={{ color: 'var(--foreground)' }}
            spellCheck={false}
          />
          {/* Colored token visualizer */}
          {token.trim() && parts.length === 3 && (
            <div className="px-3 pb-3 font-mono text-xs break-all leading-relaxed border-t border-border pt-2">
              <span style={{ color: '#f87171' }}>{parts[0]}</span>
              <span style={{ color: 'var(--muted-foreground)' }}>.</span>
              <span style={{ color: '#60a5fa' }}>{parts[1]}</span>
              <span style={{ color: 'var(--muted-foreground)' }}>.</span>
              <span style={{ color: '#4ade80' }}>{parts[2]}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="px-3 py-2 text-xs font-mono border" style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.06)' }}>
            ✗ {error}
          </div>
        )}

        {/* Decoded sections */}
        {header && payload && (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Header */}
            <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f87171' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>HEADER</span>
                </div>
                <button
                  onClick={() => copyText(JSON.stringify(header, null, 2), 'header')}
                  className="text-xs px-2 py-0.5 border border-border transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  {copied === 'header' ? '[copied!]' : '[copy]'}
                </button>
              </div>
              <div className="p-3">
                <JsonView data={header} />
              </div>
            </div>

            {/* Payload */}
            <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>PAYLOAD</span>
                </div>
                <button
                  onClick={() => copyText(JSON.stringify(payload, null, 2), 'payload')}
                  className="text-xs px-2 py-0.5 border border-border transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  {copied === 'payload' ? '[copied!]' : '[copy]'}
                </button>
              </div>
              <div className="p-3">
                <JsonView data={payload} />
              </div>
            </div>

            {/* Signature */}
            <div className="border border-border lg:col-span-2" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>SIGNATURE</span>
                  <span className="text-xs ml-2" style={{ color: 'var(--muted-foreground)' }}>
                    (cannot be verified client-side — server secret required)
                  </span>
                </div>
                <button
                  onClick={() => copyText(signature, 'sig')}
                  className="text-xs px-2 py-0.5 border border-border transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  {copied === 'sig' ? '[copied!]' : '[copy]'}
                </button>
              </div>
              <div className="p-3 font-mono text-xs break-all" style={{ color: '#4ade80' }}>
                {signature}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />header</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" />payload</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" />signature</span>
          <span className="ml-auto">all decoding is done locally — no data leaves your browser</span>
        </div>
      </div>
    </ToolTemplate>
  );
}
