'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ColorConverterPro() {
  const [hex, setHex] = useState('#FF6B35');
  const [rgb, setRgb] = useState({ r: 255, g: 107, b: 53 });
  const [hsl, setHsl] = useState({ h: 18, s: 100, l: 60 });

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const handleHexChange = (h: string) => {
    setHex(h);
    const rgbVal = hexToRgb(h);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const handleRgbChange = (key: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [key]: val };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (key: 'h' | 's' | 'l', val: number) => {
    const newHsl = { ...hsl, [key]: val };
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="border border-gray-300 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>🎨</span> Color Converter Pro
            </h1>
            <p className="text-gray-600 mb-6">HEX ↔ RGB ↔ HSL conversion</p>

            {/* Color Preview */}
            <div
              className="w-full h-32 rounded border-4 border-accent mb-6 shadow-md"
              style={{ backgroundColor: hex }}
            />

            {/* HEX */}
            <div className="bg-gray-50 border border-gray-300 p-4 rounded mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">HEXADECIMAL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 text-gray-900 p-3 rounded font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={() => copyToClipboard(hex)}
                  className="text-sm bg-accent/10 hover:bg-accent/20 text-accent px-4 rounded transition font-mono border border-accent/30"
                >
                  📋
                </button>
              </div>
            </div>

            {/* RGB */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['r', 'g', 'b'].map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 border border-gray-300 p-4 rounded"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase">{key}</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[key as 'r' | 'g' | 'b']}
                    onChange={(e) => handleRgbChange(key as 'r' | 'g' | 'b', parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-300 text-gray-900 p-3 rounded font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                    className="mt-2 w-full text-xs bg-accent/10 hover:bg-accent/20 text-accent p-1 rounded transition border border-accent/30"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>

            {/* HSL */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { key: 'h', label: 'HUE', max: 360 },
                { key: 's', label: 'SAT', max: 100 },
                { key: 'l', label: 'LIGHT', max: 100 },
              ].map(({ key, label, max }) => (
                <div
                  key={key}
                  className="bg-gray-50 border border-gray-300 p-4 rounded"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={hsl[key as 'h' | 's' | 'l']}
                    onChange={(e) => handleHslChange(key as 'h' | 's' | 'l', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-gray-700 font-mono mt-2 text-sm">
                    {hsl[key as 'h' | 's' | 'l']}
                  </div>
                </div>
              ))}
            </div>

            {/* Formats */}
            <div className="space-y-2 p-4 bg-gray-50 border border-gray-300 rounded">
              <div className="text-sm text-gray-700 font-mono">HEX: {hex}</div>
              <div className="text-sm text-gray-700 font-mono">RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
              <div className="text-sm text-gray-700 font-mono">HSL: hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</div>
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
