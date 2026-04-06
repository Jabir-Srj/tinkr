'use client';

import { useState, useEffect } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download, Copy, CheckCircle } from 'lucide-react';

interface ExtractionResult {
  text: string;
  pageCount: number;
}

export default function PDFToTextPage() {
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const extractText = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    setResult(null);

    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }

    try {
      setLoading(true);

      const pdfjsLib = await import('pdfjs-dist');
      const version = pdfjsLib.version;
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        extractedText += pageText + '\n\n';
      }

      setResult({
        text: extractedText.trim(),
        pageCount: pdf.numPages,
      });
      setLoading(false);
    } catch (err) {
      setError(`Failed to extract text: ${err}`);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadAsText = () => {
    if (result?.text) {
      const blob = new Blob([result.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'extracted_text.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!mounted) {
    return (
      <ToolTemplate
        title="PDF to Text Converter"
        description="Extract text from PDF documents"
        icon="📋"
      >
        <div className="text-center text-gray-500 dark:text-gray-400 py-16">
          Loading...
        </div>
      </ToolTemplate>
    );
  }

  return (
    <ToolTemplate
      title="PDF to Text Converter"
      description="Extract text from PDF documents"
      icon="📋"
      onReset={() => {
        setResult(null);
        setError('');
        setCopied(false);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-1">
          <ToolCard title="Upload PDF">
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-900 transition">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={extractText}
                  className="hidden"
                />
                <div className="text-4xl mb-2">{result ? '✓' : '📄'}</div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {result ? 'PDF Processed' : 'Drop PDF here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {result ? `${result.pageCount} page${result.pageCount !== 1 ? 's' : ''}` : 'or click to select'}
                </p>
              </div>
            </label>

            {result && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded text-green-800 dark:text-green-200 text-sm">
                ✓ Text extracted from <strong>{result.pageCount}</strong> page
                {result.pageCount !== 1 ? 's' : ''}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 rounded text-blue-800 dark:text-blue-200 text-sm">
                Processing PDF...
              </div>
            )}
          </ToolCard>
        </div>

        {/* Text Output */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Extracted Text">
            {result ? (
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4 h-80 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {result.text}
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {result.text.split(/\s+/).length} words • {result.text.length} characters
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-16">
                Upload a PDF to extract text
              </p>
            )}
          </ToolCard>

          {result && (
            <div className="space-y-3">
              <ToolCard>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadAsText}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download .txt
                  </button>
                </div>
              </ToolCard>

              <ToolCard title="Statistics">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {result.pageCount}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Pages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {result.text.split(/\s+/).length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Words</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {result.text.length}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Characters</p>
                  </div>
                </div>
              </ToolCard>
            </div>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
