'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function PlaceholderGeneratorPage() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#969696');
  const [text, setText] = useState('');

  const imageUrl = `https://via.placeholder.com/${width}x${height}/${bgColor.slice(1)}/${textColor.slice(1)}?text=${encodeURIComponent(text || `${width}x${height}`)}`;

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  return (
    <ToolTemplate
      title="Placeholder Generator"
      description="Generate placeholder images for designs"
      icon="🖼️"
      onReset={() => {
        setWidth(800);
        setHeight(600);
        setBgColor('#cccccc');
        setTextColor('#969696');
        setText('');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label={`Width: ${width}px`}>
              <input
                type="range"
                min="100"
                max="2000"
                step="10"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label={`Height: ${height}px`}>
              <input
                type="range"
                min="100"
                max="2000"
                step="10"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <InputGroup label="Background Color">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </InputGroup>

            <InputGroup label="Text Color">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </InputGroup>

            <InputGroup label="Text">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Leave empty for size"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <ToolCard title="Preview">
            <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 flex justify-center overflow-auto">
              <img
                src={imageUrl}
                alt="Placeholder"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
          </ToolCard>

          {/* HTML Code */}
          <ToolCard title="HTML">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                &lt;img src="{imageUrl}" alt="placeholder" /&gt;
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`<img src="${imageUrl}" alt="placeholder" />`)
                }
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          {/* Markdown */}
          <ToolCard title="Markdown">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                ![alt text]({imageUrl})
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`![alt text](${imageUrl})`)
                }
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          {/* URL */}
          <ToolCard title="Direct URL">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                {imageUrl}
              </div>
              <button
                onClick={() => copyToClipboard(imageUrl)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
