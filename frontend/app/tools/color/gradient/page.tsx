'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#FF6B6B');
  const [color2, setColor2] = useState('#4ECDC4');
  const [angle, setAngle] = useState(45);
  const [gradientType, setGradientType] = useState('linear');

  const gradient =
    gradientType === 'linear'
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${gradient};`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Gradient Generator"
      description="Create beautiful CSS gradients"
      icon="🌈"
      onReset={() => {
        setColor1('#FF6B6B');
        setColor2('#4ECDC4');
        setAngle(45);
        setGradientType('linear');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Color 1">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{color1}</p>
            </InputGroup>

            <InputGroup label="Color 2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-slate-700"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{color2}</p>
            </InputGroup>

            <InputGroup label="Type">
              <select
                value={gradientType}
                onChange={(e) => setGradientType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </InputGroup>

            {gradientType === 'linear' && (
              <InputGroup label={`Angle: ${angle}°`}>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full"
                />
              </InputGroup>
            )}
          </ToolCard>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <ToolCard>
            <div
              style={{
                background: gradient,
                height: '200px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
          </ToolCard>

          {/* CSS Code */}
          <ToolCard title="CSS Code">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                {cssCode}
              </div>
              <button
                onClick={() => copyToClipboard(cssCode)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          {/* Tailwind Code */}
          <ToolCard title="Tailwind CSS">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                from-{color1.slice(1)} to-{color2.slice(1)}
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`from-[${color1}] to-[${color2}]`)
                }
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <ToolCard title="Preset Gradients">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Sunset', c1: '#FF6B6B', c2: '#FFE66D' },
                { name: 'Ocean', c1: '#4ECDC4', c2: '#44A08D' },
                { name: 'Forest', c1: '#11998e', c2: '#38ef7d' },
                { name: 'Purple', c1: '#667eea', c2: '#764ba2' },
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setColor1(preset.c1);
                    setColor2(preset.c2);
                  }}
                  className="p-3 rounded-lg hover:shadow-lg transition"
                  style={{
                    background: `linear-gradient(135deg, ${preset.c1}, ${preset.c2})`,
                  }}
                >
                  <p className="text-white text-sm font-bold drop-shadow">{preset.name}</p>
                </button>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
