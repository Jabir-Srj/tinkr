'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, CheckCircle, XCircle } from 'lucide-react';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#0066CC');
  const [copied, setCopied] = useState('');

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
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

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <ToolTemplate
      title="Color Picker"
      description="Pick and analyze colors in multiple formats"
      icon="🎨"
      onReset={() => setColor('#0066CC')}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Color Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Select Color">
            <div className="space-y-4">
              <div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-32 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                  HEX
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      setColor(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </ToolCard>
        </div>

        {/* Color Formats */}
        <div className="lg:col-span-2">
          <ToolCard title="Color Formats">
            <div className="space-y-4">
              {/* HEX */}
              <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">HEX</p>
                  <p className="font-mono font-bold text-lg text-gray-900 dark:text-gray-100">
                    {color}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(color, 'hex')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* RGB */}
              <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">RGB</p>
                  <p className="font-mono font-bold text-lg text-gray-900 dark:text-gray-100">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* HSL */}
              <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">HSL</p>
                  <p className="font-mono font-bold text-lg text-gray-900 dark:text-gray-100">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* RGB Sliders */}
              <div className="mt-6 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">RGB Sliders</h4>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Red: {rgb.r}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) =>
                      setColor(rgbToHex(parseInt(e.target.value), rgb.g, rgb.b))
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Green: {rgb.g}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) =>
                      setColor(rgbToHex(rgb.r, parseInt(e.target.value), rgb.b))
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Blue: {rgb.b}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) =>
                      setColor(rgbToHex(rgb.r, rgb.g, parseInt(e.target.value)))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
