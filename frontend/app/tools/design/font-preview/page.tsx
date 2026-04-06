'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function FontPreview() {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('48');
  const [fontWeight, setFontWeight] = useState('400');
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [copied, setCopied] = useState(false);

  const fonts = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Trebuchet MS',
    'Comic Sans MS',
    'Impact',
    'Palatino',
    'Garamond',
  ];

  const weights = [
    { value: '100', label: 'Thin' },
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semibold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
    { value: '900', label: 'Black' },
  ];

  const generateCss = () => {
    return `font-family: '${fontFamily}';\nfont-size: ${fontSize}px;\nfont-weight: ${fontWeight};`;
  };

  const copy = () => {
    navigator.clipboard.writeText(generateCss());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔤 Font Preview</h1>
            <p className="text-muted-foreground">Preview fonts and generate CSS</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Size (px)</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  min="8"
                  max="200"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Weight</label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {weights.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Preview Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter text to preview..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Preview</label>
              <div
                className="w-full p-8 border border-border rounded-lg bg-secondary-bg text-foreground break-words"
                style={{
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {text}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Generated CSS</label>
              <div className="relative">
                <textarea
                  value={generateCss()}
                  readOnly
                  className="w-full p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none h-24"
                />
                <button
                  onClick={copy}
                  className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-accent transition"
                  title="Copy CSS"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setFontFamily('Arial');
              setFontSize('48');
              setFontWeight('400');
              setText('The quick brown fox jumps over the lazy dog');
            }}
            className="px-6 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
