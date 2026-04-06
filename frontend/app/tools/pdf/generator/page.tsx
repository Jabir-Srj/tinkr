'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

export default function PDFGeneratorPage() {
  const [title, setTitle] = useState('My Document');
  const [content, setContent] = useState('Enter your content here...');
  const [fontSize, setFontSize] = useState(12);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const generatePDF = () => {
    try {
      setLoading(true);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - 2 * margin;

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(33, 33, 33);
      pdf.text(title, margin, margin + 10);

      // Add separator line
      pdf.setDrawColor(100, 100, 100);
      pdf.line(margin, margin + 15, pageWidth - margin, margin + 15);

      // Add content
      pdf.setFontSize(fontSize);
      pdf.setTextColor(50, 50, 50);
      const splitText = pdf.splitTextToSize(content, maxWidth);
      
      let yPosition = margin + 25;
      const lineHeight = fontSize / 2.5;

      for (const line of splitText) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      }

      // Add footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, pageHeight - margin + 5);

      pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
      setLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF');
      setLoading(false);
    }
  };

  return (
    <ToolTemplate
      title="PDF Generator"
      description="Create PDF documents from text"
      icon="📄"
      onReset={() => {
        setTitle('My Document');
        setContent('Enter your content here...');
        setFontSize(12);
        setPreview(false);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Document Settings">
            <InputGroup label="Document Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Document"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label={`Font Size: ${fontSize}px`}>
              <input
                type="range"
                min="8"
                max="24"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </InputGroup>

            <div className="space-y-2">
              <button
                onClick={() => setPreview(!preview)}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition font-medium"
              >
                {preview ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                onClick={generatePDF}
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <Download size={18} />
                {loading ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </ToolCard>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          <ToolCard>
            {preview ? (
              <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-8 bg-white dark:bg-slate-900 min-h-96">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {title}
                </h1>
                <div className="border-b-2 border-gray-300 dark:border-slate-600 mb-6" />
                <p
                  className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-8 pt-4 border-t border-gray-300 dark:border-slate-600">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
            ) : (
              <InputGroup label="Document Content">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content here..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 resize-none h-96 font-mono"
                />
              </InputGroup>
            )}
          </ToolCard>

          <ToolCard title="Tips">
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Use meaningful titles for your documents</li>
              <li>• Font size adjusts readability (8-24px)</li>
              <li>• Preview shows exact PDF layout</li>
              <li>• Long content automatically pages</li>
              <li>• Special characters are supported</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
