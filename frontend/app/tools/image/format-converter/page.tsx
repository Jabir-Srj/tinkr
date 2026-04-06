'use client';

import { useState, useRef } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Download, X, Loader2, FileUp } from 'lucide-react';

interface ConvertImage {
  id: string;
  file: File;
  preview: string;
  converted: Blob | null;
}

const FORMATS = ['png', 'jpg', 'webp', 'gif', 'bmp'] as const;
type ImageFormat = typeof FORMATS[number];

export default function ImageFormatConverter() {
  const [images, setImages] = useState<ConvertImage[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('png');
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
        const newImage: ConvertImage = {
          id: String(Date.now() + Math.random()),
          file,
          preview: event.target?.result as string,
          converted: null,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const convertImage = async (img: ConvertImage, format: ImageFormat, q: number): Promise<ConvertImage> => {
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

        let mimeType = `image/${format}`;
        // Handle special cases
        if (format === 'jpg') mimeType = 'image/jpeg';
        if (format === 'bmp') mimeType = 'image/bmp';

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...img,
                converted: blob,
              });
            } else {
              resolve(img);
            }
          },
          mimeType,
          q
        );
      };
      image.src = img.preview;
    });
  };

  const convertAll = async () => {
    if (images.length === 0) {
      setError('Please select images');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const converted = await Promise.all(
        images.map((img) => convertImage(img, targetFormat, quality))
      );
      setImages(converted);
    } catch (err) {
      setError('Failed to convert images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (img: ConvertImage) => {
    if (!img.converted) return;
    const url = URL.createObjectURL(img.converted);
    const link = document.createElement('a');
    const name = img.file.name.split('.')[0];
    link.href = url;
    link.download = `${name}.${targetFormat}`;
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
        if (img.converted) {
          const name = img.file.name.split('.')[0];
          zip.file(`${name}.${targetFormat}`, img.converted);
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-images.zip`;
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
    setTargetFormat('png');
    setQuality(0.9);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatInfo: Record<ImageFormat, string> = {
    png: 'Lossless compression, supports transparency',
    jpg: 'Lossy compression, smaller file size',
    webp: 'Modern format, better compression',
    gif: 'Animation support, limited colors',
    bmp: 'Uncompressed, large file size',
  };

  return (
    <ToolTemplate
      title="Image Format Converter"
      description="Convert images between different formats"
      icon="🎨"
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
            {/* Format Selection */}
            <ToolCard title="2. Target Format">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {FORMATS.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setTargetFormat(fmt)}
                      className={`p-3 rounded-lg text-sm font-medium transition ${
                        targetFormat === fmt
                          ? 'bg-accent text-white'
                          : 'border border-border bg-secondary-bg hover:border-accent'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm">
                  {formatInfo[targetFormat]}
                </div>
              </div>
            </ToolCard>

            {/* Quality Settings */}
            <ToolCard title="3. Quality Settings">
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
                  Applies to lossy formats (JPG, WebP)
                </p>
              </div>
            </ToolCard>

            {/* Images List */}
            <ToolCard title={`4. Images (${images.length})`}>
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
                        {img.file.type} → {targetFormat.toUpperCase()}
                      </p>
                    </div>
                    {img.converted && (
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

            {/* Convert Button */}
            {images.some((img) => !img.converted) && (
              <button
                onClick={convertAll}
                disabled={loading}
                className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
              </button>
            )}

            {/* Download Buttons */}
            {images.every((img) => img.converted) && (
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
