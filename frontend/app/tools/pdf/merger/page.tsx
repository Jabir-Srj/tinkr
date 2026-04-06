'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download, Trash2, GripVertical } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFFile {
  id: string;
  name: string;
  file: File;
  pageCount: number;
}

export default function PDFMergerPage() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setError('');

    for (const file of uploadedFiles) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are supported');
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();

        setFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            file,
            pageCount,
          },
        ]);
      } catch (err) {
        setError(`Failed to load ${file.name}: ${err}`);
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    const index = files.findIndex((f) => f.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) {
      return;
    }

    const newFiles = [...files];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[swapIndex]] = [newFiles[swapIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Add at least 2 PDF files to merge');
      return;
    }

    try {
      setLoading(true);
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      URL.revokeObjectURL(url);

      setLoading(false);
    } catch (err) {
      setError(`Error merging PDFs: ${err}`);
      setLoading(false);
    }
  };

  return (
    <ToolTemplate
      title="PDF Merger"
      description="Merge multiple PDF files into one"
      icon="📎"
      onReset={() => {
        setFiles([]);
        setError('');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-1">
          <ToolCard title="Upload PDFs">
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-900 transition">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="text-4xl mb-2">📁</div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  Drop PDFs here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or click to select files
                </p>
              </div>
            </label>

            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={mergePDFs}
              disabled={loading || files.length < 2}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
            >
              <Download size={18} />
              {loading ? 'Merging...' : 'Merge PDFs'}
            </button>
          </ToolCard>
        </div>

        {/* File List */}
        <div className="lg:col-span-2">
          <ToolCard title={`Selected Files (${files.length})`}>
            {files.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No files uploaded yet
              </p>
            ) : (
              <div className="space-y-2">
                {files.map((pdfFile, index) => (
                  <div
                    key={pdfFile.id}
                    className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                  >
                    <span className="font-bold text-blue-600 dark:text-blue-400 min-w-6 text-center">
                      {index + 1}
                    </span>
                    <GripVertical size={18} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {pdfFile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pdfFile.pageCount} page{pdfFile.pageCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveFile(pdfFile.id, 'up')}
                        disabled={index === 0}
                        className="px-2 py-1 text-xs bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveFile(pdfFile.id, 'down')}
                        disabled={index === files.length - 1}
                        className="px-2 py-1 text-xs bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFile(pdfFile.id)}
                        className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ToolCard>

          <ToolCard title="Instructions">
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Upload multiple PDF files</li>
              <li>• Use up/down arrows to reorder</li>
              <li>• Pages will merge in order</li>
              <li>• Remove files with delete button</li>
              <li>• Download merged PDF when ready</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
