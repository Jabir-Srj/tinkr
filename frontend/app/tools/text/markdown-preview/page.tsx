'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(`# Hello World

## Subheading

This is a **bold** text and this is *italic*.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
const greeting = "Hello";
\`\`\`

[Link](https://example.com)`);

  const convertMarkdownToHtml = (md: string) => {
    let html = md;
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(`.*?`)/g, '<code>$1</code>');
    html = html.replace(/\n/g, '<br/>');
    return html;
  };

  const htmlPreview = convertMarkdownToHtml(markdown);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Markdown Preview"
      description="Preview and convert Markdown"
      icon="📝"
      onReset={() =>
        setMarkdown(`# Hello World

## Subheading

This is a **bold** text and this is *italic*.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
const greeting = "Hello";
\`\`\`

[Link](https://example.com)`)
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div>
          <ToolCard title="Markdown">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-96 font-mono text-sm"
            />
          </ToolCard>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <ToolCard title="Preview">
            <div
              className="h-80 overflow-y-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </ToolCard>

          <button
            onClick={() => copyToClipboard(markdown)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center gap-2"
          >
            <Copy size={16} />
            Copy Markdown
          </button>
        </div>
      </div>
    </ToolTemplate>
  );
}
