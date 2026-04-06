'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(300);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  return (
    <ToolTemplate
      title="QR Code Generator"
      description="Generate QR codes instantly"
      icon="📱"
      onReset={() => {
        setText('https://example.com');
        setSize(300);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Data to Encode">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="URL, text, email, phone..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-20"
              />
            </InputGroup>

            <InputGroup label={`Size: ${size}px`}>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <ToolCard>
            <div className="flex justify-center p-6 bg-gray-100 dark:bg-slate-900 rounded-lg">
              <img src={qrUrl} alt="QR Code" style={{ width: `${Math.min(size, 300)}px` }} />
            </div>
          </ToolCard>

          {/* Download */}
          <ToolCard>
            <div className="space-y-2">
              <a
                href={qrUrl}
                download
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-center font-semibold"
              >
                Download QR Code
              </a>
              <button
                onClick={() => copyToClipboard(qrUrl)}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition"
              >
                Copy URL
              </button>
            </div>
          </ToolCard>

          {/* HTML */}
          <ToolCard title="HTML">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                &lt;img src="{qrUrl}" alt="qr" /&gt;
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`<img src="${qrUrl}" alt="qr" />`)
                }
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <ToolCard title="Common Uses">
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• URLs: https://example.com</li>
              <li>• WiFi: WIFI:T:WPA;S:name;P:pass</li>
              <li>• Phone: tel:+1234567890</li>
              <li>• Email: mailto:user@example.com</li>
              <li>• vCard: mecard format</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
