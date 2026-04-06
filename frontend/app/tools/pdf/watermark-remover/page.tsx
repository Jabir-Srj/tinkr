'use client';

import { useState, useEffect } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download } from 'lucide-react';
import { PDFDocument, PDFName } from 'pdf-lib';

interface PreviewData {
  file: File;
  pageCount: number;
  previewUrl: string;
}

export default function PDFWatermarkRemoverPage() {
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [opacity, setOpacity] = useState(0.3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

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

      // Get first page for preview
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Could not get canvas context');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      };

      await firstPage.render(renderContext).promise;
      const previewUrl = canvas.toDataURL();

      setPreview({
        file,
        pageCount: pdf.numPages,
        previewUrl,
      });

      setLoading(false);
    } catch (err) {
      setError(`Failed to load PDF: ${err}`);
      setLoading(false);
    }
  };

  const removeWatermark = async () => {
    if (!preview) return;

    try {
      setLoading(true);

      const arrayBuffer = await preview.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // Remove annotations (watermarks, annotations, etc.)
      for (const page of pages) {
        const annots = page.node.Annots();
        if (annots) {
          // Get the dictionary object
          const annotsArray = annots.asArray();
          if (annotsArray) {
            // Remove all annotations
            page.node.set(PDFName.of('Annots'), undefined as any);
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${preview.file.name.replace('.pdf', '')}_cleaned.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setLoading(false);
    } catch (err) {
      setError(`Error processing PDF: ${err}`);
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <ToolTemplate
        title="PDF Watermark Remover"
        description="Remove watermarks and annotations from PDFs"
        icon="💧"
      >
        <div className="text-center text-gray-500 dark:text-gray-400 py-16">
          Loading...
        </div>
      </ToolTemplate>
    );
  }

  return (
    <ToolTemplate
      title="PDF Watermark Remover"
      description="Remove watermarks and annotations from PDFs"
      icon="💧"
      onReset={() => {
        setPreview(null);
        setError('');
        setOpacity(0.3);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload & Preview */}
        <div className="lg:col-span-1">
          <ToolCard title="Upload PDF">
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-900 transition">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="text-4xl mb-2">{preview ? '✓' : '📄'}</div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {preview ? 'PDF Loaded' : 'Drop PDF here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {preview ? `${preview.pageCount} pages` : 'or click to select'}
                </p>
              </div>
            </label>

            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 rounded text-blue-800 dark:text-blue-200 text-sm animate-pulse">
                Processing PDF...
              </div>
            )}
          </ToolCard>
        </div>

        {/* Preview & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Preview">
            {preview ? (
              <div className="space-y-4">
                <div className="border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-900">
                  <img
                    src={preview.previewUrl}
                    alt="PDF Preview"
                    className="w-full h-auto"
                    style={{ opacity: Math.max(0.1, 1 - opacity) }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Showing page 1 of {preview.pageCount} with opacity preview
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-16">
                Upload a PDF to preview
              </p>
            )}
          </ToolCard>

          {preview && (
            <ToolCard title="Processing Settings">
              <InputGroup label={`Watermark Opacity: ${Math.round((1 - opacity) * 100)}%`}>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="0.95"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    (This is just for preview visualization)
                  </p>
                </div>
              </InputGroup>

              <button
                onClick={removeWatermark}
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2 mt-4"
              >
                <Download size={18} />
                {loading ? 'Processing...' : 'Download Clean PDF'}
              </button>
            </ToolCard>
          )}

          <ToolCard title="What This Tool Does">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Removes all annotations from PDF</li>
              <li>• Strips watermarks and overlays</li>
              <li>• Preserves document content</li>
              <li>• Works on all PDF annotations</li>
              <li className="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-300 dark:border-slate-600">
                Note: Some watermarks may be embedded in the document content and cannot be removed
              </li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
