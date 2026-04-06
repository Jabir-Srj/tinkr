'use client';

import { useState, useRef, useEffect } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download } from 'lucide-react';

export default function QRCodePage() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = () => {
    if (!text || text.trim() === '') return;

    // Dynamic import for qrcode library
    import('qrcode').then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(
          canvasRef.current,
          text,
          {
            errorCorrectionLevel: errorCorrection as any,
            quality: 0.95,
            margin: 1,
            width: size,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          } as any,
          (error: any) => {
            if (error) console.error(error);
          }
        );
      }
    });
  };

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `qrcode-${Date.now()}.png`;
      link.click();
    }
  };

  useEffect(() => {
    generateQR();
  }, [text, size, errorCorrection]);

  return (
    <ToolTemplate
      title="QR Code Generator"
      description="Generate QR codes for any text, URL, or data"
      icon="📱"
      onReset={() => {
        setText('https://example.com');
        setSize(300);
        setErrorCorrection('M');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Text or URL">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to encode..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
              />
            </InputGroup>

            <InputGroup label="Size (px)">
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="50"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-16">
                  {size}px
                </span>
              </div>
            </InputGroup>

            <InputGroup label="Error Correction Level">
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% recovery)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% recovery)</option>
              </select>
            </InputGroup>

            <button
              onClick={downloadQR}
              className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download QR Code
            </button>
          </ToolCard>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <ToolCard>
            <div className="text-center p-8 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">QR Code Preview</p>
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 bg-white"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <ToolCard>
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Data Length</p>
                  <p className="text-2xl font-bold text-blue-600">{text.length}</p>
                  <p className="text-xs text-gray-500">characters</p>
                </div>
              </ToolCard>
              <ToolCard>
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Version</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.ceil(Math.sqrt(text.length / 50)) || 1}
                  </p>
                  <p className="text-xs text-gray-500">auto</p>
                </div>
              </ToolCard>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
