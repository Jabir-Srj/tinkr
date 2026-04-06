'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Download } from 'lucide-react';

export default function SVGToPNGPage() {
  const [svgCode, setSvgCode] = useState(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="blue"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="20">SVG Circle</text>
</svg>`);
  const [scale, setScale] = useState(1);
  const [preview, setPreview] = useState('');

  const generatePreview = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');
      const svg = doc.documentElement;
      
      if (svg.tagName === 'parsererror') {
        setPreview('error');
        return;
      }
      
      const width = parseInt(svg.getAttribute('width') || '200') * scale;
      const height = parseInt(svg.getAttribute('height') || '200') * scale;
      
      canvas.width = width;
      canvas.height = height;
      ctx!.fillStyle = 'white';
      ctx!.fillRect(0, 0, width, height);
      
      const svgBlob = new Blob([svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        ctx!.drawImage(img, 0, 0, width, height);
        setPreview(canvas.toDataURL('image/png'));
      };
      img.src = url;
    } catch (error) {
      setPreview('error');
    }
  };

  const downloadPNG = () => {
    if (!preview || preview === 'error') {
      alert('Please generate preview first');
      return;
    }
    const link = document.createElement('a');
    link.href = preview;
    link.download = `converted-${Date.now()}.png`;
    link.click();
  };

  return (
    <ToolTemplate
      title="SVG to PNG"
      description="Convert SVG images to PNG format"
      icon="🖼️"
      onReset={() => {
        setSvgCode(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="blue"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="20">SVG Circle</text>
</svg>`);
        setScale(1);
        setPreview('');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <ToolCard title="SVG Input">
          <InputGroup label="SVG Code">
            <textarea
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              placeholder="Paste SVG code here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-48 font-mono text-sm"
            />
          </InputGroup>

          <InputGroup label="Scale">
            <input
              type="number"
              min="0.5"
              max="5"
              step="0.5"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </InputGroup>

          <button
            onClick={generatePreview}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition mt-2"
          >
            Generate Preview
          </button>
        </ToolCard>

        <ToolCard title="PNG Preview">
          {preview && preview !== 'error' ? (
            <div className="space-y-3">
              <img src={preview} alt="Preview" className="w-full border border-border rounded-lg" />
              <button
                onClick={downloadPNG}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download PNG
              </button>
            </div>
          ) : preview === 'error' ? (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-300 text-sm">
              Invalid SVG code. Please check your input.
            </div>
          ) : (
            <div className="p-8 bg-gray-100 dark:bg-slate-900 rounded-lg text-center text-gray-500 dark:text-gray-400">
              Preview will appear here
            </div>
          )}
        </ToolCard>
      </div>

      <ToolCard title="Info">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> This tool converts SVG to PNG using canvas rendering. Complex SVGs with external resources may not convert properly.
        </p>
      </ToolCard>
    </ToolTemplate>
  );
}
