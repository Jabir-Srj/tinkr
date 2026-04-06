'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function MetaTagsGeneratorPage() {
  const [title, setTitle] = useState('My Awesome Website');
  const [description, setDescription] = useState('Welcome to my awesome website. Learn more about our services.');
  const [author, setAuthor] = useState('John Doe');
  const [keywords, setKeywords] = useState('website, awesome, services');
  const [og_title, setOgTitle] = useState('My Awesome Website');
  const [og_description, setOgDescription] = useState('Welcome to my awesome website');
  const [og_image, setOgImage] = useState('https://example.com/image.jpg');
  const [og_url, setOgUrl] = useState('https://example.com');

  const metaTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="author" content="${author}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${og_url}">
<meta property="og:title" content="${og_title}">
<meta property="og:description" content="${og_description}">
<meta property="og:image" content="${og_image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${og_url}">
<meta property="twitter:title" content="${og_title}">
<meta property="twitter:description" content="${og_description}">
<meta property="twitter:image" content="${og_image}">`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Meta Tags Generator"
      description="Generate SEO meta tags for your website"
      icon="🏷️"
      onReset={() => {
        setTitle('My Awesome Website');
        setDescription('Welcome to my awesome website. Learn more about our services.');
        setAuthor('John Doe');
        setKeywords('website, awesome, services');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <ToolCard title="Basic Meta Tags">
            <InputGroup label="Page Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page title..."
                maxLength={60}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/60 characters</p>
            </InputGroup>

            <InputGroup label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Meta description..."
                maxLength={160}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-20"
              />
              <p className="text-xs text-gray-500 mt-1">{description.length}/160 characters</p>
            </InputGroup>

            <InputGroup label="Author">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Keywords">
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Comma separated keywords..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>

          <ToolCard title="Open Graph / Social">
            <InputGroup label="OG Title">
              <input
                type="text"
                value={og_title}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="OG Description">
              <input
                type="text"
                value={og_description}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="OG Image URL">
              <input
                type="text"
                value={og_image}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="OG URL">
              <input
                type="text"
                value={og_url}
                onChange={(e) => setOgUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div>
          <ToolCard title="HTML Code">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-xs text-gray-900 dark:text-gray-100 h-96 overflow-y-auto break-all whitespace-pre-wrap">
                {metaTags}
              </div>
              <button
                onClick={() => copyToClipboard(metaTags)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <div className="mt-4">
            <ToolCard title="Tips">
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>• Title: 50-60 characters</li>
              <li>• Description: 150-160 characters</li>
              <li>• Use relevant keywords</li>
              <li>• Include OG tags for social sharing</li>
              <li>• Use high-quality OG images (1200x630px)</li>
            </ul>
            </ToolCard>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
