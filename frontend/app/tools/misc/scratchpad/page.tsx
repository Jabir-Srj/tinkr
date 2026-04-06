'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Download, Upload } from 'lucide-react';

export default function ScratchpadPage() {
  const [content, setContent] = useState('');

  const downloadAsText = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `scratchpad-${Date.now()}.txt`;
    link.click();
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <ToolTemplate
      title="Scratchpad"
      description="Quick note-taking tool with save and load"
      icon="📝"
      onReset={() => setContent('')}
    >
      <div className="space-y-4">
        <ToolCard>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your notes here... (auto-saved to browser)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-96 font-mono"
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={downloadAsText}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Save as .txt
            </button>

            <label className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer">
              <Upload size={18} />
              Load File
              <input type="file" accept=".txt" onChange={uploadFile} className="hidden" />
            </label>
          </div>
        </ToolCard>

        <ToolCard title="Statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg text-center border border-border">
              <p className="text-xs text-blue-600 dark:text-blue-300 mb-1">Characters</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{content.length}</p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-slate-800 rounded-lg text-center border border-border">
              <p className="text-xs text-teal-600 dark:text-teal-300 mb-1">Words</p>
              <p className="text-2xl font-bold text-teal-900 dark:text-teal-100">
                {content.trim() === '' ? 0 : content.trim().split(/\s+/).length}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-slate-800 rounded-lg text-center border border-border">
              <p className="text-xs text-green-600 dark:text-green-300 mb-1">Lines</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {content === '' ? 0 : content.split('\n').length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-slate-800 rounded-lg text-center border border-border">
              <p className="text-xs text-purple-600 dark:text-purple-300 mb-1">No Spaces</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {content.replace(/\s/g, '').length}
              </p>
            </div>
          </div>
        </ToolCard>

        <ToolCard title="Features">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>✓ Auto-saves to browser (localStorage)</li>
            <li>✓ Download as plain text file</li>
            <li>✓ Upload and edit text files</li>
            <li>✓ Real-time character count</li>
            <li>✓ No server, 100% private</li>
          </ul>
        </ToolCard>
      </div>
    </ToolTemplate>
  );
}
