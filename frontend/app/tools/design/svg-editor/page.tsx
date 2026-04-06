'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function SvgEditor() {
  const [svg, setSvg] = useState(
    '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="#3498db" />\n  <rect x="50" y="50" width="100" height="100" fill="#e74c3c" opacity="0.5" />\n</svg>'
  );
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const validateSvg = (svgString: string) => {
    try {
      setError('');
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'text/xml');
      if (doc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid SVG');
      }
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid SVG';
      setError(msg);
      return false;
    }
  };

  const handleSvgChange = (value: string) => {
    setSvg(value);
    validateSvg(value);
  };

  const copy = () => {
    navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    element.download = 'image.svg';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportPng = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  };

  const isValid = !error && svg.trim().length > 0;

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">✏️ SVG Editor</h1>
            <p className="text-muted-foreground">Edit and preview SVG code</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">SVG Code</label>
              <textarea
                value={svg}
                onChange={(e) => handleSvgChange(e.target.value)}
                className="w-full h-96 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="<svg>...</svg>"
              />
            </div>

            {isValid && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Preview</label>
                <div className="w-full h-96 p-4 border border-border rounded-lg bg-secondary-bg overflow-auto flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Error: {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {isValid && (
              <>
                <button
                  onClick={copy}
                  className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={download}
                  className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition flex items-center gap-2 font-medium"
                >
                  <Download size={16} /> SVG
                </button>
                <button
                  onClick={exportPng}
                  className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition flex items-center gap-2 font-medium"
                >
                  <Download size={16} /> PNG
                </button>
              </>
            )}
            <button
              onClick={() => {
                setSvg('');
                setError('');
              }}
              className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
