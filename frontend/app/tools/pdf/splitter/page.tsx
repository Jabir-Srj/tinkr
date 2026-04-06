'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFInfo {
  file: File;
  pageCount: number;
  fileName: string;
}

export default function PDFSplitterPage() {
  const [pdfInfo, setPdfInfo] = useState<PDFInfo | null>(null);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      setPdfInfo({
        file,
        pageCount,
        fileName: file.name,
      });

      setStartPage(1);
      setEndPage(Math.min(5, pageCount));
    } catch (err) {
      setError(`Failed to load PDF: ${err}`);
    }
  };

  const splitPDF = async () => {
    if (!pdfInfo) return;

    if (startPage < 1 || endPage > pdfInfo.pageCount || startPage > endPage) {
      setError('Invalid page range');
      return;
    }

    try {
      setLoading(true);

      const arrayBuffer = await pdfInfo.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const pageIndices = [];
      for (let i = startPage - 1; i < endPage; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = pdfInfo.fileName.replace('.pdf', '');
      link.download = `${baseName}_pages_${startPage}-${endPage}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setLoading(false);
    } catch (err) {
      setError(`Error splitting PDF: ${err}`);
      setLoading(false);
    }
  };

  return (
    <ToolTemplate
      title="PDF Splitter"
      description="Extract specific pages from PDF"
      icon="✂️"
      onReset={() => {
        setPdfInfo(null);
        setStartPage(1);
        setEndPage(1);
        setError('');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
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
                <div className="text-4xl mb-2">📄</div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {pdfInfo ? '✓ PDF Loaded' : 'Drop PDF here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {pdfInfo ? pdfInfo.fileName : 'or click to select'}
                </p>
              </div>
            </label>

            {pdfInfo && (
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 rounded text-blue-800 dark:text-blue-200 text-sm">
                Total pages: <strong>{pdfInfo.pageCount}</strong>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-sm">
                {error}
              </div>
            )}
          </ToolCard>
        </div>

        {/* Settings & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard title="Page Range">
            {pdfInfo ? (
              <div className="space-y-4">
                <InputGroup label="Start Page">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max={pdfInfo.pageCount}
                      value={startPage}
                      onChange={(e) => setStartPage(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-gray-600 dark:text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-400 font-semibold">
                      {pdfInfo.pageCount}
                    </span>
                  </div>
                </InputGroup>

                <InputGroup label="End Page">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max={pdfInfo.pageCount}
                      value={endPage}
                      onChange={(e) =>
                        setEndPage(Math.min(pdfInfo.pageCount, parseInt(e.target.value) || 1))
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-gray-600 dark:text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-400 font-semibold">
                      {pdfInfo.pageCount}
                    </span>
                  </div>
                </InputGroup>

                <div className="p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Extracting <strong>{Math.max(0, endPage - startPage + 1)}</strong> page
                    {Math.max(0, endPage - startPage + 1) !== 1 ? 's' : ''}
                  </p>
                </div>

                <button
                  onClick={splitPDF}
                  disabled={loading || !pdfInfo}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {loading ? 'Extracting...' : 'Download Pages'}
                </button>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Upload a PDF to get started
              </p>
            )}
          </ToolCard>

          <ToolCard title="Quick Selections">
            {pdfInfo && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setStartPage(1);
                    setEndPage(1);
                  }}
                  className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded text-sm transition"
                >
                  First Page
                </button>
                <button
                  onClick={() => {
                    setStartPage(pdfInfo.pageCount);
                    setEndPage(pdfInfo.pageCount);
                  }}
                  className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded text-sm transition"
                >
                  Last Page
                </button>
                <button
                  onClick={() => {
                    setStartPage(1);
                    setEndPage(pdfInfo.pageCount);
                  }}
                  className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded text-sm transition col-span-2"
                >
                  All Pages
                </button>
              </div>
            )}
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
