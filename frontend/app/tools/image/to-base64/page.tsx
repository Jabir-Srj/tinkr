'use client';

import { useState, useRef } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Copy, FileUp, X, Download } from 'lucide-react';

interface Base64Image {
  id: string;
  file: File;
  preview: string;
  base64: string;
  copiedToClipboard: boolean;
}

export default function ImageToBase64() {
  const [images, setImages] = useState<Base64Image[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.includes('image')) {
        setError('Only image files are supported');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: Base64Image = {
          id: String(Date.now() + Math.random()),
          file,
          preview: event.target?.result as string,
          base64: event.target?.result as string,
          copiedToClipboard: false,
        };
        setImages((prev) => [...prev, newImage]);
        setSelectedId(String(Date.now() + Math.random()));
      };
      reader.readAsDataURL(file);
    });

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyToClipboard = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;

    navigator.clipboard.writeText(img.base64);
    
    setImages((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, copiedToClipboard: true } : i
      )
    );

    setTimeout(() => {
      setImages((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, copiedToClipboard: false } : i
        )
      );
    }, 2000);
  };

  const downloadBase64 = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(img.base64));
    element.setAttribute('download', `${img.file.name.split('.')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadHtml = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${img.file.name}</title>
</head>
<body>
  <img src="${img.base64}" alt="${img.file.name}" style="max-width: 100%; height: auto;">
</body>
</html>`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    element.setAttribute('download', `${img.file.name.split('.')[0]}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (selectedId === id && filtered.length > 0) {
        setSelectedId(filtered[0].id);
      } else if (filtered.length === 0) {
        setSelectedId(null);
      }
      return filtered;
    });
  };

  const selectedImage = images.find((i) => i.id === selectedId);

  const reset = () => {
    setImages([]);
    setSelectedId(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (base64: string) => {
    const binaryString = atob(base64.split(',')[1] || '');
    return (binaryString.length / 1024).toFixed(2);
  };

  return (
    <ToolTemplate
      title="Image to Base64"
      description="Convert images to Base64 encoded strings"
      icon="🔤"
      onReset={reset}
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <ToolCard title="1. Upload Images">
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click or drag images here
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </ToolCard>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
            {error}
          </div>
        )}

        {images.length > 0 && (
          <>
            {/* Images List */}
            <ToolCard title={`2. Images (${images.length})`}>
              <div className="space-y-2">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedId(img.id)}
                    className={`w-full p-3 rounded-lg border transition flex items-center gap-3 text-left ${
                      selectedId === img.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-secondary-bg hover:border-accent'
                    }`}
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 text-xs min-w-0">
                      <p className="font-medium truncate">{img.file.name}</p>
                      <p className="text-muted-foreground">
                        {formatFileSize(img.base64)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className="p-1 hover:text-red-500 transition"
                    >
                      <X size={16} />
                    </button>
                  </button>
                ))}
              </div>
            </ToolCard>

            {/* Base64 Display */}
            {selectedImage && (
              <ToolCard title="3. Base64 Output">
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="rounded-lg border border-border overflow-hidden bg-secondary-bg p-4">
                    <img
                      src={selectedImage.preview}
                      alt={selectedImage.file.name}
                      className="w-full h-auto max-h-64 object-contain"
                    />
                  </div>

                  {/* Base64 Code Block */}
                  <div className="rounded-lg border border-border bg-secondary-bg overflow-hidden">
                    <div className="max-h-48 overflow-y-auto p-4">
                      <code className="text-xs text-muted-foreground break-all font-mono">
                        {selectedImage.base64}
                      </code>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => copyToClipboard(selectedImage.id)}
                      className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Copy size={16} />
                      {selectedImage.copiedToClipboard ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={() => downloadBase64(selectedImage.id)}
                      className="flex-1 px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Save as TXT
                    </button>
                    <button
                      onClick={() => downloadHtml(selectedImage.id)}
                      className="flex-1 px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Save as HTML
                    </button>
                  </div>

                  {/* HTML Embed Example */}
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs">
                    <p className="font-medium mb-2">Embed in HTML:</p>
                    <code className="block overflow-x-auto">
                      {`<img src="${selectedImage.base64}" />`}
                    </code>
                  </div>
                </div>
              </ToolCard>
            )}
          </>
        )}

        {images.length === 0 && (
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm">
            Upload images to convert them to Base64. Useful for embedding images directly in HTML/CSS without separate file requests.
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
