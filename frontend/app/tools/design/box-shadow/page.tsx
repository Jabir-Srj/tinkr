'use client';

import { useState, useRef, useEffect } from 'react';
import ToolTemplate from '@/components/ToolTemplate';

interface ShadowLayer {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

let _id = 1;
const uid = () => _id++;

const defaultLayer = (): ShadowLayer => ({
  id: uid(), x: 4, y: 4, blur: 10, spread: 0, color: '#000000', opacity: 30, inset: false,
});

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="text-xs px-2 py-0.5 border border-border transition-colors"
      style={{ color: 'var(--muted-foreground)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
    >
      {copied ? '[copied!]' : '[copy]'}
    </button>
  );
}

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
}

function buildShadowValue(layers: ShadowLayer[]): string {
  return layers
    .map((l) =>
      `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`
    )
    .join(',\n  ');
}

const PRESETS = [
  { label: 'Soft lift', layers: [{ id: uid(), x: 0, y: 4, blur: 16, spread: 0, color: '#000000', opacity: 20, inset: false }] },
  { label: 'Hard drop', layers: [{ id: uid(), x: 4, y: 4, blur: 0, spread: 0, color: '#000000', opacity: 60, inset: false }] },
  { label: 'Glow (amber)', layers: [{ id: uid(), x: 0, y: 0, blur: 20, spread: 4, color: '#f59e0b', opacity: 50, inset: false }] },
  { label: 'Inner depth', layers: [{ id: uid(), x: 0, y: 2, blur: 8, spread: -2, color: '#000000', opacity: 40, inset: true }] },
  {
    label: 'Double shadow', layers: [
      { id: uid(), x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 20, inset: false },
      { id: uid(), x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 20, inset: false },
    ],
  },
  { label: 'Neon glow', layers: [{ id: uid(), x: 0, y: 0, blur: 30, spread: 6, color: '#6366f1', opacity: 70, inset: false }] },
];

function Slider({ label, value, min, max, step = 1, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-16 shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1 accent-amber-400 cursor-pointer"
      />
      <span className="text-xs w-8 text-right font-mono shrink-0" style={{ color: 'var(--accent)' }}>{value}</span>
    </div>
  );
}

export default function BoxShadowGenerator() {
  const [layers, setLayers] = useState<ShadowLayer[]>([defaultLayer()]);
  const [selected, setSelected] = useState(layers[0].id);
  const [bgColor, setBgColor] = useState('#1e293b');
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [radius, setRadius] = useState(8);

  const shadowCSS = buildShadowValue(layers);
  const fullCSS = `box-shadow: ${shadowCSS.replace(/\n\s+/g, '\n  ')};`;

  const updateLayer = (id: number, patch: Partial<ShadowLayer>) => {
    setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const addLayer = () => {
    const nl = defaultLayer();
    setLayers((ls) => [...ls, nl]);
    setSelected(nl.id);
  };

  const removeLayer = (id: number) => {
    setLayers((ls) => {
      const next = ls.filter((l) => l.id !== id);
      if (next.length === 0) {
        const nl = defaultLayer();
        setSelected(nl.id);
        return [nl];
      }
      if (selected === id) setSelected(next[0].id);
      return next;
    });
  };

  const loadPreset = (preset: typeof PRESETS[number]) => {
    const newLayers = preset.layers.map((l) => ({ ...l, id: uid() }));
    setLayers(newLayers);
    setSelected(newLayers[0].id);
  };

  const sel = layers.find((l) => l.id === selected) ?? layers[0];

  return (
    <ToolTemplate
      title="Box Shadow Generator"
      description="Visual CSS box-shadow builder"
      icon="🌑"
      onReset={() => {
        const nl = defaultLayer();
        setLayers([nl]);
        setSelected(nl.id);
        setBgColor('#1e293b');
        setBoxColor('#ffffff');
        setRadius(8);
      }}
    >
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Preview */}
          <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>PREVIEW</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  bg
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-5 h-5 border-0 bg-transparent cursor-pointer rounded" />
                </label>
                <label className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  box
                  <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-5 h-5 border-0 bg-transparent cursor-pointer rounded" />
                </label>
              </div>
            </div>
            <div
              className="flex items-center justify-center p-10"
              style={{ backgroundColor: bgColor, minHeight: 200 }}
            >
              <div
                style={{
                  width: 120, height: 120,
                  backgroundColor: boxColor,
                  borderRadius: radius,
                  boxShadow: layers.map((l) =>
                    `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`
                  ).join(', '),
                  transition: 'box-shadow 0.2s',
                }}
              />
            </div>
            {/* Border radius slider */}
            <div className="px-3 pb-3 border-t border-border pt-2">
              <Slider label="radius" value={radius} min={0} max={80} onChange={setRadius} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {/* Layer tabs */}
            <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
                <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>LAYERS</span>
                <button
                  onClick={addLayer}
                  className="text-xs px-2 py-0.5 border border-border transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                >
                  [+ add layer]
                </button>
              </div>
              <div className="divide-y divide-border">
                {layers.map((l, i) => (
                  <div
                    key={l.id}
                    className="flex items-center gap-2 px-3 py-1.5 cursor-pointer"
                    style={l.id === selected ? { backgroundColor: 'rgba(255,255,255,0.04)' } : {}}
                    onClick={() => setSelected(l.id)}
                  >
                    <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: hexToRgba(l.color, l.opacity) }} />
                    <span className="text-xs flex-1 font-mono" style={{ color: l.id === selected ? 'var(--accent)' : 'var(--muted-foreground)' }}>
                      shadow-{i + 1} {l.inset ? '(inset)' : ''}
                    </span>
                    {layers.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeLayer(l.id); }}
                        className="text-xs opacity-50 hover:opacity-100 px-1"
                        style={{ color: '#f87171' }}
                      >✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected layer controls */}
            {sel && (
              <div className="border border-border p-3 space-y-2.5" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <Slider label="offset-x" value={sel.x} min={-80} max={80} onChange={(v) => updateLayer(sel.id, { x: v })} />
                <Slider label="offset-y" value={sel.y} min={-80} max={80} onChange={(v) => updateLayer(sel.id, { y: v })} />
                <Slider label="blur" value={sel.blur} min={0} max={100} onChange={(v) => updateLayer(sel.id, { blur: v })} />
                <Slider label="spread" value={sel.spread} min={-50} max={50} onChange={(v) => updateLayer(sel.id, { spread: v })} />
                <Slider label="opacity" value={sel.opacity} min={0} max={100} onChange={(v) => updateLayer(sel.id, { opacity: v })} />
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--muted-foreground)' }}>
                    color
                    <input type="color" value={sel.color} onChange={(e) => updateLayer(sel.id, { color: e.target.value })} className="w-6 h-6 border-0 bg-transparent cursor-pointer rounded" />
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer ml-auto" style={{ color: 'var(--muted-foreground)' }}>
                    <input
                      type="checkbox"
                      checked={sel.inset}
                      onChange={(e) => updateLayer(sel.id, { inset: e.target.checked })}
                      className="accent-amber-400"
                    />
                    inset
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CSS Output */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>CSS OUTPUT</span>
            <CopyBtn text={fullCSS} />
          </div>
          <pre className="p-3 text-xs font-mono overflow-x-auto" style={{ color: 'var(--accent)' }}>
            <span style={{ color: 'var(--muted-foreground)' }}>box-shadow: </span>
            {shadowCSS};
          </pre>
        </div>

        {/* Presets */}
        <div className="border border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <div className="px-3 py-1.5 border-b border-border">
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>PRESETS</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border)' }}>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => loadPreset(p)}
                className="flex flex-col items-center justify-center gap-2 p-4 transition-colors hover:bg-border/50"
                style={{ backgroundColor: 'var(--secondary-bg)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg"
                  style={{
                    backgroundColor: '#fff',
                    boxShadow: p.layers.map((l) =>
                      `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`
                    ).join(', '),
                  }}
                />
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
