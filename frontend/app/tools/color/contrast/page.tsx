'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function ColorContrastCheckerPage() {
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');

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

  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const checkWCAG = (ratio: number) => {
    if (ratio >= 7) return { AA: '✓ AAA', AAA: '✓ AAA', level: 'AAA' };
    if (ratio >= 4.5) return { AA: '✓ AA', AAA: '✗ AAA', level: 'AA' };
    if (ratio >= 3) return { AA: '✓ AA (large)', AAA: '✗ AAA', level: 'AA Large' };
    return { AA: '✗ AA', AAA: '✗ AAA', level: 'Fail' };
  };

  const ratio = parseFloat(getContrastRatio(bgColor, textColor));
  const wcag = checkWCAG(ratio);

  return (
    <ToolTemplate
      title="Contrast Checker"
      description="Check WCAG accessibility compliance"
      icon="✅"
      onReset={() => {
        setBgColor('#FFFFFF');
        setTextColor('#000000');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Colors">
            <InputGroup label="Background Color">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{bgColor}</p>
            </InputGroup>

            <InputGroup label="Text Color">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{textColor}</p>
            </InputGroup>
          </ToolCard>
        </div>

        {/* Preview & Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <ToolCard title="Preview">
            <div className="space-y-4">
              <div style={{ backgroundColor: bgColor, padding: '24px', borderRadius: '8px' }}>
                <p style={{ color: textColor, fontSize: '18px', fontWeight: 'bold' }}>
                  Sample Text - Normal (14px)
                </p>
                <p style={{ color: textColor, fontSize: '24px', fontWeight: 'bold', marginTop: '12px' }}>
                  Large Text (18px+)
                </p>
              </div>
            </div>
          </ToolCard>

          {/* Contrast Ratio */}
          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Contrast Ratio</p>
              <p className="text-5xl font-bold text-blue-600">{ratio}:1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">WCAG Level: {wcag.level}</p>
            </div>
          </ToolCard>

          {/* WCAG Results */}
          <ToolCard title="WCAG Standards">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">AA (Normal Text)</span>
                <span className={wcag.AA.includes('✓') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {wcag.AA}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">AAA (Normal Text)</span>
                <span className={wcag.AAA.includes('✓') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {wcag.AAA}
                </span>
              </div>
            </div>
          </ToolCard>

          <ToolCard title="Guidelines">
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>• AA: 4.5:1 (minimum for normal text)</li>
              <li>• AAA: 7:1 (enhanced)</li>
              <li>• Large text: 3:1 (AA), 4.5:1 (AAA)</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
