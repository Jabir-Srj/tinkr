'use client';

import { useState, useRef } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Download, X, Loader2, FileUp } from 'lucide-react';

interface ImageFile {
  id: string;
  original: File;
  compressed: Blob | null;
  preview: string;
  originalSize: number;
  compressedSize: number;
  ratio: number;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);
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
        const newImage: ImageFile = {
          id: String(Date.now() + Math.random()),
          original: file,
          compressed: null,
          preview: event.target?.result as string,
          originalSize: file.size,
          compressedSize: 0,
          ratio: 0,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const compressImage = async (img: ImageFile): Promise<ImageFile> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img);
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const ratio = Math.round(((img.originalSize - blob.size) / img.originalSize) * 100);
              resolve({
                ...img,
                compressed: blob,
                compressedSize: blob.size,
                ratio: Math.max(0, ratio),
              });
            } else {
              resolve(img);
            }
          },
          'image/jpeg',
          quality
        );
      };
      image.src = img.preview;
    });
  };

  const compressAll = async () => {
    if (images.length === 0) {
      setError('Please select images to compress');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const compressed = await Promise.all(images.map(compressImage));
      setImages(compressed);
    } catch (err) {
      setError('Failed to compress images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (img: ImageFile) => {
    if (!img.compressed) return;
    const url = URL.createObjectURL(img.compressed);
    const link = document.createElement('a');
    link.href = url;
    link.download = img.original.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      images.forEach((img) => {
        if (img.compressed) {
          zip.file(img.original.name, img.compressed);
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed-images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError('Failed to create ZIP file');
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const reset = () => {
    setImages([]);
    setQuality(0.7);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <ToolTemplate
      title="Image Compressor"
      description="Compress images while maintaining quality"
      icon="🖼️"
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
              Click or drag images here (PNG, JPG, WebP)
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

        {/* Settings */}
        {images.length > 0 && (
          <ToolCard title="2. Quality Settings">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Lower quality = smaller file size
              </p>
            </div>
          </ToolCard>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <ToolCard title={`3. Images (${images.length})`}>
            <div className="space-y-2">
              {images.map((img) => (
                <div key={img.id} className="p-4 rounded-lg border border-border bg-secondary-bg">
                  <div className="flex gap-4">
                    <img
                      src={img.preview}
                      alt={img.original.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{img.original.name}</p>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Original:</span>
                          <span>{formatSize(img.originalSize)}</span>
                        </div>
                        {img.compressed && (
                          <>
                            <div className="flex justify-between">
                              <span>Compressed:</span>
                              <span>{formatSize(img.compressedSize)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Saved:</span>
                              <span>↓ {img.ratio}%</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      {img.compressed && (
                        <button
                          onClick={() => downloadImage(img)}
                          className="p-2 bg-accent text-white rounded-lg hover:opacity-90 transition"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(img.id)}
                        className="p-2 border border-border rounded-lg hover:bg-border transition text-muted-foreground"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ToolCard>
        )}

        {/* Compress Button */}
        {images.length > 0 && images.some((img) => !img.compressed) && (
          <button
            onClick={compressAll}
            disabled={loading}
            className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Compressing...' : 'Compress Images'}
          </button>
        )}

        {/* Download All Button */}
        {images.length > 0 && images.every((img) => img.compressed) && (
          <div className="flex gap-3">
            <button
              onClick={() => images.forEach(downloadImage)}
              className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download All
            </button>
            {images.length > 1 && (
              <button
                onClick={downloadAll}
                className="flex-1 px-6 py-3 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
              >
                Download as ZIP
              </button>
            )}
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
