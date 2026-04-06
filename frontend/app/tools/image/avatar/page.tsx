'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, RefreshCw } from 'lucide-react';

export default function AvatarGeneratorPage() {
  const [seed, setSeed] = useState('felix');
  const [style, setStyle] = useState('pixel-art');

  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

  const styles = ['pixel-art', 'avataaars', 'big-smile', 'bottts', 'croodles', 'fun-emoji'];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Avatar Generator"
      description="Generate unique avatars with DiceBear"
      icon="👤"
      onReset={() => {
        setSeed('felix');
        setStyle('pixel-art');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Seed (Unique ID)">
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Enter any text..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Style">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </InputGroup>

            <button
              onClick={() => setSeed(Math.random().toString())}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Randomize
            </button>
          </ToolCard>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <ToolCard>
            <div className="flex justify-center">
              <img src={avatarUrl} alt="Avatar" className="w-48 h-48 rounded-lg" />
            </div>
          </ToolCard>

          {/* URL */}
          <ToolCard title="Image URL">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                {avatarUrl}
              </div>
              <button
                onClick={() => copyToClipboard(avatarUrl)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          {/* HTML */}
          <ToolCard title="HTML">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 break-all">
                &lt;img src="{avatarUrl}" alt="avatar" /&gt;
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`<img src="${avatarUrl}" alt="avatar" />`)
                }
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
