'use client';

import { useState, useCallback } from 'react';
import ToolTemplate from '@/components/ToolTemplate';

interface CronField {
  name: string;
  label: string;
  min: number;
  max: number;
  allowedValues?: { val: string; label: string }[];
}

const FIELDS: CronField[] = [
  { name: 'minute', label: 'Minute', min: 0, max: 59 },
  { name: 'hour', label: 'Hour', min: 0, max: 23 },
  { name: 'day', label: 'Day of Month', min: 1, max: 31 },
  {
    name: 'month', label: 'Month', min: 1, max: 12,
    allowedValues: [
      { val: '1', label: 'Jan' }, { val: '2', label: 'Feb' }, { val: '3', label: 'Mar' },
      { val: '4', label: 'Apr' }, { val: '5', label: 'May' }, { val: '6', label: 'Jun' },
      { val: '7', label: 'Jul' }, { val: '8', label: 'Aug' }, { val: '9', label: 'Sep' },
      { val: '10', label: 'Oct' }, { val: '11', label: 'Nov' }, { val: '12', label: 'Dec' },
    ],
  },
  {
    name: 'weekday', label: 'Day of Week', min: 0, max: 6,
    allowedValues: [
      { val: '0', label: 'Sun' }, { val: '1', label: 'Mon' }, { val: '2', label: 'Tue' },
      { val: '3', label: 'Wed' }, { val: '4', label: 'Thu' }, { val: '5', label: 'Fri' }, { val: '6', label: 'Sat' },
    ],
  },
];

const PRESETS = [
  { label: 'Every minute', expr: '* * * * *', desc: 'Runs every minute' },
  { label: 'Every hour', expr: '0 * * * *', desc: 'Runs at the start of every hour' },
  { label: 'Every day midnight', expr: '0 0 * * *', desc: 'Runs daily at midnight' },
  { label: 'Every Sunday midnight', expr: '0 0 * * 0', desc: 'Runs every Sunday at midnight' },
  { label: 'Every weekday 9am', expr: '0 9 * * 1-5', desc: 'Runs Mon–Fri at 9:00 AM' },
  { label: 'Every 15 minutes', expr: '*/15 * * * *', desc: 'Runs every 15 minutes' },
  { label: 'Every 6 hours', expr: '0 */6 * * *', desc: 'Runs every 6 hours' },
  { label: '1st of each month', expr: '0 0 1 * *', desc: 'Runs at midnight on the 1st of every month' },
];

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid cron expression (need 5 fields)';

  const [min, hour, dom, month, dow] = parts;

  const describeField = (val: string, unit: string, names?: string[]): string => {
    if (val === '*') return `every ${unit}`;
    if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`;
    if (val.includes('-')) {
      const [a, b] = val.split('-');
      const na = names ? names[parseInt(a)] : a;
      const nb = names ? names[parseInt(b)] : b;
      return `${unit} ${na}–${nb}`;
    }
    if (val.includes(',')) {
      const list = val.split(',').map((v) => (names ? names[parseInt(v)] ?? v : v));
      return `${unit}s ${list.join(', ')}`;
    }
    const named = names ? names[parseInt(val)] ?? val : val;
    return `${unit} ${named}`;
  };

  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dowNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const parts2: string[] = [];

  if (min !== '*') parts2.push(`at minute ${min}`);
  if (hour !== '*') parts2.push(hour.includes('/') ? describeField(hour, 'hour') : `at ${hour.padStart(2, '0')}:${min === '*' ? '00' : min.padStart(2, '0')}`);
  if (dom !== '*') parts2.push(`on day ${dom} of month`);
  if (month !== '*') parts2.push(`in ${describeField(month, 'month', monthNames)}`);
  if (dow !== '*') parts2.push(`on ${describeField(dow, 'weekday', dowNames)}`);

  if (parts2.length === 0) return 'Every minute';

  if (min !== '*' && hour !== '*' && dom === '*' && month === '*' && dow === '*') {
    const hNum = parseInt(hour);
    const mNum = parseInt(min);
    if (!isNaN(hNum) && !isNaN(mNum)) {
      const ampm = hNum >= 12 ? 'PM' : 'AM';
      const h12 = hNum % 12 || 12;
      return `Every day at ${h12}:${String(mNum).padStart(2, '0')} ${ampm}`;
    }
  }

  return `Runs: ${parts2.join(', ')}`;
}

export default function CronBuilder() {
  const [fields, setFields] = useState(['*', '*', '*', '*', '*']);
  const [rawExpr, setRawExpr] = useState('* * * * *');
  const [rawMode, setRawMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const expr = fields.join(' ');
  const description = describeCron(rawMode ? rawExpr : expr);
  const activeExpr = rawMode ? rawExpr : expr;

  const updateField = (idx: number, val: string) => {
    const next = [...fields];
    next[idx] = val;
    setFields(next);
  };

  const loadPreset = (e: string) => {
    const parts = e.split(' ');
    setFields(parts);
    setRawExpr(e);
    setRawMode(false);
  };

  const copyExpr = () => {
    navigator.clipboard.writeText(activeExpr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolTemplate
      title="Cron Builder"
      description="Visual cron expression builder & explainer"
      icon="⏰"
      onReset={() => { setFields(['*', '*', '*', '*', '*']); setRawExpr('* * * * *'); setRawMode(false); }}
    >
      <div className="space-y-4 max-w-3xl mx-auto">

        {/* Expression display */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>CRON EXPRESSION</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRawMode(!rawMode)}
                className="text-xs px-2 py-0.5 border border-border transition-colors"
                style={{ color: rawMode ? 'var(--accent)' : 'var(--muted-foreground)' }}
              >
                {rawMode ? '[visual]' : '[raw]'}
              </button>
              <button
                onClick={copyExpr}
                className="text-xs px-2 py-0.5 border border-border transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                {copied ? '[copied!]' : '[copy]'}
              </button>
            </div>
          </div>

          {rawMode ? (
            <div className="flex items-center border-b border-border">
              <span className="px-2 text-xs border-r border-border py-2" style={{ color: 'var(--accent)' }}>❯</span>
              <input
                type="text"
                value={rawExpr}
                onChange={(e) => setRawExpr(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 font-mono text-xl focus:outline-none"
                style={{ color: 'var(--accent)' }}
                placeholder="* * * * *"
              />
            </div>
          ) : (
            <div className="px-4 py-4 font-mono text-2xl font-bold tracking-widest text-center" style={{ color: 'var(--accent)' }}>
              {fields.map((f, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: 'var(--muted-foreground)' }}> </span>}
                  <span>{f}</span>
                </span>
              ))}
            </div>
          )}

          <div className="px-4 py-2 border-t border-border text-xs font-mono" style={{ color: '#4ade80' }}>
            # {description}
          </div>
        </div>

        {/* Visual field editors */}
        {!rawMode && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {FIELDS.map((field, idx) => (
              <div key={field.name} className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <div className="px-2 py-1 border-b border-border">
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{field.label}</span>
                </div>
                <div className="p-2 space-y-1.5">
                  {/* Quick picks */}
                  <div className="flex flex-wrap gap-1">
                    {['*', '*/2', '*/5', '0'].filter((v, i, arr) => {
                      if (field.name === 'minute') return true;
                      if (field.name === 'hour') return ['*', '*/6', '*/12', '0'].includes(v) || i < 2;
                      return v === '*' || v === '0';
                    }).slice(0, 4).map((v) => (
                      <button
                        key={v}
                        onClick={() => updateField(idx, v)}
                        className="text-xs px-1.5 py-0.5 border border-border font-mono transition-colors"
                        style={
                          fields[idx] === v
                            ? { backgroundColor: 'var(--accent)', color: 'var(--background)', borderColor: 'var(--accent)' }
                            : { color: 'var(--muted-foreground)' }
                        }
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  {/* Custom input */}
                  <input
                    type="text"
                    value={fields[idx]}
                    onChange={(e) => updateField(idx, e.target.value)}
                    className="w-full bg-transparent border border-border px-2 py-1 text-xs font-mono focus:outline-none focus:border-accent"
                    style={{ color: 'var(--foreground)' }}
                    placeholder="*"
                  />
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {field.min}–{field.max}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Field legend */}
        {!rawMode && (
          <div className="flex gap-3 flex-wrap text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>
            <span><span style={{ color: 'var(--accent)' }}>*</span> = any</span>
            <span><span style={{ color: 'var(--accent)' }}>*/n</span> = every n</span>
            <span><span style={{ color: 'var(--accent)' }}>a-b</span> = range</span>
            <span><span style={{ color: 'var(--accent)' }}>a,b</span> = list</span>
          </div>
        )}

        {/* Presets */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border">
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>COMMON PRESETS</span>
          </div>
          <div className="divide-y divide-border">
            {PRESETS.map((p) => (
              <button
                key={p.expr}
                onClick={() => loadPreset(p.expr)}
                className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors hover:bg-border/30 group"
              >
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{p.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{p.desc}</div>
                </div>
                <code
                  className="text-xs font-mono px-2 py-0.5 border border-border shrink-0 ml-4 group-hover:border-accent transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  {p.expr}
                </code>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
