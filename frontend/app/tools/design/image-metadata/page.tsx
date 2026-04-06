'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ImageMetadataViewer() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);

      // Extract metadata
      const img = new Image();
      img.onload = () => {
        const meta: Record<string, string> = {
          Filename: file.name,
          'File Size': `${(file.size / 1024).toFixed(2)} KB`,
          'File Type': file.type,
          Width: `${img.width}px`,
          Height: `${img.height}px`,
          'Aspect Ratio': `${(img.width / img.height).toFixed(2)}:1`,
          'Last Modified': new Date(file.lastModified).toLocaleString(),
        };

        setMetadata(meta);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📸 Image Metadata Viewer</h1>
            <p className="text-muted-foreground">View detailed image information</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Upload Image</label>
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg bg-secondary-bg hover:bg-border/50 transition cursor-pointer">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📁</div>
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, WebP</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Preview</label>
                  <div className="w-full aspect-square bg-secondary-bg rounded-lg overflow-hidden border border-border">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {Object.entries(metadata).length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Metadata</label>
                  <div className="space-y-2 p-4 border border-border rounded-lg bg-secondary-bg max-h-96 overflow-y-auto">
                    {Object.entries(metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start gap-2 pb-2 border-b border-border/30 last:border-b-0">
                        <span className="text-sm font-medium text-muted-foreground">{key}:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">{value}</span>
                          <button
                            onClick={() => copy(value)}
                            className="p-1 hover:text-accent transition"
                            title="Copy value"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!imageFile && (
                <div className="p-4 border border-border rounded-lg bg-secondary-bg text-center text-muted-foreground text-sm">
                  Upload an image to view its metadata
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
