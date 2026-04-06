'use client';

import { useState, useRef } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Download, X, Loader2, FileUp } from 'lucide-react';

interface ResizeImage {
  id: string;
  file: File;
  preview: string;
  originalWidth: number;
  originalHeight: number;
  resized: Blob | null;
  format: 'png' | 'jpg' | 'webp';
}

const PRESETS = [
  { name: 'Thumbnail', width: 150, height: 150 },
  { name: 'Avatar', width: 300, height: 300 },
  { name: 'HD', width: 1280, height: 720 },
  { name: 'Full HD', width: 1920, height: 1080 },
  { name: '4K', width: 3840, height: 2160 },
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Twitter Header', width: 1500, height: 500 },
];

export default function ImageResizer() {
  const [images, setImages] = useState<ResizeImage[]>([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [aspectLocked, setAspectLocked] = useState(true);
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp'>('png');
  const [quality, setQuality] = useState(0.9);
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
        const img = new Image();
        img.onload = () => {
          const newImage: ResizeImage = {
            id: String(Date.now() + Math.random()),
            file,
            preview: event.target?.result as string,
            originalWidth: img.width,
            originalHeight: img.height,
            resized: null,
            format: 'png',
          };
          setImages((prev) => [...prev, newImage]);

          // Set initial dimensions
          if (aspectLocked) {
            const ratio = img.width / img.height;
            setWidth(800);
            setHeight(Math.round(800 / ratio));
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resizeImage = async (img: ResizeImage, w: number, h: number, fmt: string, q: number): Promise<ResizeImage> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img);
          return;
        }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(image, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...img,
                resized: blob,
                format: fmt as 'png' | 'jpg' | 'webp',
              });
            } else {
              resolve(img);
            }
          },
          `image/${fmt}`,
          q
        );
      };
      image.src = img.preview;
    });
  };

  const resizeAll = async () => {
    if (images.length === 0) {
      setError('Please select images');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const resized = await Promise.all(
        images.map((img) => resizeImage(img, width, height, format, quality))
      );
      setImages(resized);
    } catch (err) {
      setError('Failed to resize images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (img: ResizeImage) => {
    if (!img.resized) return;
    const url = URL.createObjectURL(img.resized);
    const link = document.createElement('a');
    const name = img.file.name.split('.')[0];
    link.href = url;
    link.download = `${name}-${width}x${height}.${img.format}`;
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
        if (img.resized) {
          const name = img.file.name.split('.')[0];
          zip.file(`${name}-${width}x${height}.${img.format}`, img.resized);
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resized-images.zip';
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

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (aspectLocked && images.length > 0) {
      const ratio = images[0].originalHeight / images[0].originalWidth;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (aspectLocked && images.length > 0) {
      const ratio = images[0].originalWidth / images[0].originalHeight;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const reset = () => {
    setImages([]);
    setWidth(800);
    setHeight(600);
    setAspectLocked(true);
    setFormat('png');
    setQuality(0.9);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <ToolTemplate
      title="Image Resizer"
      description="Resize images to specific dimensions"
      icon="📐"
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
            {/* Presets */}
            <ToolCard title="2. Quick Presets">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={`p-2 rounded-lg text-xs font-medium transition ${
                      width === preset.width && height === preset.height
                        ? 'bg-accent text-white'
                        : 'border border-border bg-secondary-bg hover:border-accent'
                    }`}
                  >
                    {preset.name}
                    <div className="text-xs opacity-75">{preset.width}×{preset.height}</div>
                  </button>
                ))}
              </div>
            </ToolCard>

            {/* Dimensions */}
            <ToolCard title="3. Custom Dimensions">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aspectLocked}
                    onChange={(e) => setAspectLocked(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-muted-foreground">Lock aspect ratio</span>
                </label>
              </div>
            </ToolCard>

            {/* Format & Quality */}
            <ToolCard title="4. Format & Quality">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </ToolCard>

            {/* Images Preview */}
            <ToolCard title={`5. Images (${images.length})`}>
              <div className="space-y-2">
                {images.map((img) => (
                  <div key={img.id} className="p-3 rounded-lg border border-border bg-secondary-bg flex items-center gap-3">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 text-xs">
                      <p className="font-medium truncate">{img.file.name}</p>
                      <p className="text-muted-foreground">
                        {img.originalWidth}×{img.originalHeight} → {width}×{height}
                      </p>
                    </div>
                    {img.resized && (
                      <button
                        onClick={() => downloadImage(img)}
                        className="p-2 bg-accent text-white rounded hover:opacity-90"
                      >
                        <Download size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-2 border border-border rounded hover:bg-border"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </ToolCard>

            {/* Resize Button */}
            {images.some((img) => !img.resized) && (
              <button
                onClick={resizeAll}
                disabled={loading}
                className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Resizing...' : 'Resize All Images'}
              </button>
            )}

            {/* Download Buttons */}
            {images.every((img) => img.resized) && (
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
          </>
        )}
      </div>
    </ToolTemplate>
  );
}
