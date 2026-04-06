'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, Download } from 'lucide-react';

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(
    `# Hello Markdown!

## Features
- Easy to use
- Fast rendering
- Live preview

**Bold** and *italic* text

\`\`\`js
const hello = "world";
\`\`\`

> A block quote
`
  );

  const downloadAsHtml = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Export</title>
  <style>
    body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1, h2 { color: #333; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
${markdown}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `markdown-${Date.now()}.html`;
    link.click();
  };

  return (
    <ToolTemplate
      title="Markdown Preview"
      description="Write and preview markdown in real-time"
      icon="📝"
      onReset={() =>
        setMarkdown(`# Hello Markdown!

## Features
- Easy to use
- Fast rendering
- Live preview

**Bold** and *italic* text
`)
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div>
          <ToolCard title="Markdown Input">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-96"
              placeholder="Enter markdown here..."
            />
            <button
              onClick={downloadAsHtml}
              className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export as HTML
            </button>
          </ToolCard>
        </div>

        {/* Preview */}
        <div>
          <ToolCard title="Preview">
            <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-slate-900 rounded-lg h-96 overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(markdown) }} />
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}

function simpleMarkdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic">$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/m, '<ul class="list-disc pl-6">$1</ul>');

  return `<p>${html}</p>`;
}
