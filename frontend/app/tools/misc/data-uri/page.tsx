'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function DataURIPage() {
  const [text, setText] = useState('Hello World');
  const [dataUri, setDataUri] = useState('');
  const [mimeType, setMimeType] = useState('text/plain');

  const generateDataURI = (str: string, mime: string) => {
    const encoded = btoa(unescape(encodeURIComponent(str)));
    return `data:${mime};base64,${encoded}`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setDataUri(generateDataURI(value, mimeType));
  };

  const handleMimeChange = (newMime: string) => {
    setMimeType(newMime);
    setDataUri(generateDataURI(text, newMime));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <ToolTemplate
      title="Data URI Generator"
      description="Convert text to Data URI format"
      icon="📦"
      onReset={() => {
        setText('Hello World');
        setMimeType('text/plain');
        setDataUri(generateDataURI('Hello World', 'text/plain'));
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <ToolCard title="Input">
          <InputGroup label="Text Content">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
            />
          </InputGroup>

          <InputGroup label="MIME Type">
            <select
              value={mimeType}
              onChange={(e) => handleMimeChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>text/plain</option>
              <option>text/html</option>
              <option>text/xml</option>
              <option>text/css</option>
              <option>application/json</option>
              <option>application/javascript</option>
              <option>image/svg+xml</option>
            </select>
          </InputGroup>
        </ToolCard>

        <ToolCard title="Data URI Output">
          <InputGroup label="Generated URI">
            <textarea
              value={dataUri}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-32 font-mono text-xs"
            />
          </InputGroup>
          <button
            onClick={() => copyToClipboard(dataUri)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
          >
            <Copy size={16} />
            Copy URI
          </button>
        </ToolCard>
      </div>

      <ToolCard title="Info">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          <strong>Data URIs</strong> allow you to embed data directly in HTML/CSS without external files.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Format: <code>data:[MIME type];base64,[encoded data]</code>
        </p>
      </ToolCard>
    </ToolTemplate>
  );
}
