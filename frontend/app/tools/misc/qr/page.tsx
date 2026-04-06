'use client';

import { useState } from 'react';
import { Download, RotateCcw, Copy, Check } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('https://example.com');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState('png');

  const generateQR = (text: string) => {
    if (text) {
      const encoded = encodeURIComponent(text);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&ecc=${errorCorrection}&format=${format}`;
      setQrUrl(url);
    }
  };

  const handleGenerate = () => {
    generateQR(input);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qr-code.${format}`;
    link.click();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setQrUrl('');
    setCopied(false);
  };

  const presets = [
    { label: 'URL', value: 'https://example.com' },
    { label: 'Email', value: 'mailto:example@example.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
    { label: 'vCard', value: 'BEGIN:VCARD\nFN:John Doe\nTEL:+1234567890\nEND:VCARD' },
  ];

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📱 QR Code Generator</h1>
            <p className="text-muted-foreground">Advanced QR code generation with customization</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input & Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Text / URL / Data</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text, URL, email, phone, or other data..."
                  className="w-full h-24 p-4 border border-border rounded-lg bg-secondary-bg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-sm font-medium mb-2">Quick Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setInput(preset.value)}
                      className="py-2 px-3 text-sm border border-border bg-secondary-bg text-foreground rounded hover:bg-border hover:text-accent transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4 p-4 bg-secondary-bg border border-border rounded-lg">
                <h3 className="font-semibold text-foreground">Settings</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Size: {size}x{size}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    {[200, 300, 500, 1000].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1 text-xs rounded border transition ${
                          size === s
                            ? 'bg-accent text-white border-accent'
                            : 'border-border bg-background text-foreground hover:bg-border'
                        }`}
                      >
                        {s}x{s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Error Correction Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { level: 'L', desc: 'Low (7%)' },
                      { level: 'M', desc: 'Medium (15%)' },
                      { level: 'Q', desc: 'Quartile (25%)' },
                      { level: 'H', desc: 'High (30%)' },
                    ].map(({ level, desc }) => (
                      <button
                        key={level}
                        onClick={() => setErrorCorrection(level)}
                        className={`py-2 px-3 text-xs rounded border transition ${
                          errorCorrection === level
                            ? 'bg-accent text-white border-accent'
                            : 'border-border bg-background text-foreground hover:bg-border'
                        }`}
                      >
                        <div className="font-medium">{level}</div>
                        <div className="text-xs opacity-70">{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <div className="flex gap-2">
                    {['png', 'jpg', 'svg', 'eps'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={`flex-1 py-2 px-3 text-sm rounded border transition ${
                          format === fmt
                            ? 'bg-accent text-white border-accent'
                            : 'border-border bg-background text-foreground hover:bg-border'
                        }`}
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                className="w-full py-3 px-4 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium text-lg"
              >
                Generate QR Code
              </button>
            </div>

            {/* Right: Preview & Actions */}
            <div className="space-y-6">
              {qrUrl ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">QR Code Preview</label>
                    <div className="p-6 bg-secondary-bg border border-border rounded-lg flex justify-center items-center min-h-80">
                      <img
                        src={qrUrl}
                        alt="QR Code"
                        className="max-w-full max-h-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={downloadQR}
                      className="w-full py-3 px-4 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download QR Code
                    </button>

                    <div className="relative">
                      <input
                        type="text"
                        value={qrUrl}
                        readOnly
                        className="w-full px-4 py-2 border border-border rounded-lg bg-secondary-bg text-foreground text-sm font-mono"
                        placeholder="URL will appear here"
                      />
                      <button
                        onClick={copyUrl}
                        className="absolute top-2 right-2 p-2 bg-border rounded hover:bg-accent hover:text-white transition"
                        title="Copy URL"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-sm space-y-2">
                      <p className="font-medium text-foreground">QR Code Info:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Size: <span className="text-foreground font-mono">{size}x{size}px</span></li>
                        <li>• Error Correction: <span className="text-foreground font-mono">{errorCorrection} ({['L', 'M', 'Q', 'H'].indexOf(errorCorrection) * 7 + 7}%)</span></li>
                        <li>• Format: <span className="text-foreground font-mono">{format.toUpperCase()}</span></li>
                        <li>• Data Length: <span className="text-foreground font-mono">{input.length} characters</span></li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-80 bg-secondary-bg border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-6">
                  <div className="text-5xl mb-4">📱</div>
                  <p className="text-muted-foreground mb-2">Enter data and generate to preview QR code</p>
                  <p className="text-sm text-muted-foreground">Supports URLs, text, emails, phone numbers, WiFi, and more</p>
                </div>
              )}
            </div>
          </div>

          {/* Clear Button */}
          {qrUrl && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleClear}
                className="py-2 px-6 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Clear & Start Over
              </button>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 space-y-6 p-6 bg-secondary-bg border border-border rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground mb-2">💡 Tips & Tricks</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Higher error correction</strong> makes QR codes more robust but larger</li>
                <li>• <strong>Larger sizes</strong> are better for printing or scanning from far away</li>
                <li>• <strong>PNG is best</strong> for web; SVG for scaling; EPS for print</li>
                <li>• <strong>Try presets</strong> for common formats like WiFi or vCard</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">🎯 Supported Data Types</h3>
              <ul className="space-y-1 text-sm text-muted-foreground grid grid-cols-2">
                <li>✓ URLs & Websites</li>
                <li>✓ Email Addresses</li>
                <li>✓ Phone Numbers</li>
                <li>✓ WiFi Networks</li>
                <li>✓ Contact Cards (vCard)</li>
                <li>✓ Plain Text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
