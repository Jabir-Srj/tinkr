'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ColorNameFinder() {
  const [color, setColor] = useState('#3498db');
  const [colorName, setColorName] = useState('');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');
  const [copied, setCopied] = useState(false);

  const colorNames: Record<string, string> = {
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFC0CB': 'Pink',
    '#FF6347': 'Tomato',
    '#FFD700': 'Gold',
    '#DEB887': 'Burlywood',
    '#FFA500': 'Orange',
    '#8B0000': 'Dark Red',
    '#FFFFFF': 'White',
    '#000000': 'Black',
    '#808080': 'Gray',
    '#3498DB': 'Dodger Blue',
    '#2ECC71': 'Emerald',
    '#E74C3C': 'Alizarin',
    '#F39C12': 'Orange Peel',
    '#9B59B6': 'Purple',
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const findColorInfo = () => {
    const hex = color.toUpperCase();
    const rgb_obj = hexToRgb(color);

    if (!rgb_obj) return;

    setRgb(`rgb(${rgb_obj.r}, ${rgb_obj.g}, ${rgb_obj.b})`);

    const hsl_obj = rgbToHsl(rgb_obj.r, rgb_obj.g, rgb_obj.b);
    setHsl(`hsl(${hsl_obj.h}, ${hsl_obj.s}%, ${hsl_obj.l}%)`);

    const name = colorNames[hex] || 'Custom Color';
    setColorName(name);
  };

  const copy_color = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🎨 Color Name Finder</h1>
            <p className="text-muted-foreground">Find color names and formats</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 h-12 rounded-lg cursor-pointer border border-border"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Color Name</label>
                <div className="px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-medium">
                  {colorName || '—'}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">HEX</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm">
                    {color}
                  </div>
                  <button
                    onClick={() => copy_color(color)}
                    className="px-3 py-3 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Preview</label>
                <div
                  className="h-12 rounded-lg border border-border"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>

            {rgb && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">RGB</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm">
                      {rgb}
                    </div>
                    <button
                      onClick={() => copy_color(rgb)}
                      className="px-3 py-3 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">HSL</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm">
                      {hsl}
                    </div>
                    <button
                      onClick={() => copy_color(hsl)}
                      className="px-3 py-3 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={findColorInfo}
              className="w-full px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Analyze Color
            </button>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
