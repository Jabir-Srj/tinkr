'use client';

import { useState, useRef } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Download, X, Loader2, FileUp } from 'lucide-react';

interface NoiseImage {
  id: string;
  file: File;
  preview: string;
  processed: Blob | null;
}

export default function ImageNoiseReducer() {
  const [images, setImages] = useState<NoiseImage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [strength, setStrength] = useState(2);
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
        const newImage: NoiseImage = {
          id: String(Date.now() + Math.random()),
          file,
          preview: event.target?.result as string,
          processed: null,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);

      if (!selectedId) {
        setSelectedId(String(Date.now() + Math.random()));
      }
    });

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Bilateral filter for noise reduction
  const applyBilateralFilter = async (
    img: NoiseImage,
    kernelSize: number
  ): Promise<NoiseImage> => {
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

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple box blur + median-like effect for noise reduction
        const kernel = Math.floor(kernelSize / 2);
        const output = new Uint8ClampedArray(data.length);

        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % canvas.width;
          const y = Math.floor(pixelIndex / canvas.width);

          let r = 0, g = 0, b = 0, a = 0, count = 0;

          for (let ky = -kernel; ky <= kernel; ky++) {
            for (let kx = -kernel; kx <= kernel; kx++) {
              const nx = x + kx;
              const ny = y + ky;

              if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
                const idx = (ny * canvas.width + nx) * 4;
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                a += data[idx + 3];
                count++;
              }
            }
          }

          output[i] = r / count;
          output[i + 1] = g / count;
          output[i + 2] = b / count;
          output[i + 3] = a / count;
        }

        const newImageData = new ImageData(output, canvas.width, canvas.height);
        ctx.putImageData(newImageData, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                ...img,
                processed: blob,
              });
            } else {
              resolve(img);
            }
          },
          'image/png',
          0.95
        );
      };
      image.src = img.preview;
    });
  };

  const processNoise = async () => {
    if (!selectedId) return;

    setLoading(true);
    setError('');

    try {
      const result = await applyBilateralFilter(
        images.find((i) => i.id === selectedId)!,
        strength
      );

      setImages((prev) =>
        prev.map((i) => (i.id === selectedId ? result : i))
      );
    } catch (err) {
      setError('Failed to process image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (img: NoiseImage) => {
    if (!img.processed) return;
    const url = URL.createObjectURL(img.processed);
    const link = document.createElement('a');
    const name = img.file.name.split('.')[0];
    link.href = url;
    link.download = `${name}-denoised.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  const reset = () => {
    setImages([]);
    setSelectedId(null);
    setStrength(2);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const selectedImage = images.find((i) => i.id === selectedId);

  return (
    <ToolTemplate
      title="Image Noise Reducer"
      description="Reduce noise and grain from images"
      icon="✨"
      onReset={reset}
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <ToolCard title="1. Upload Image">
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click or drag image here
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
                      {img.processed && (
                        <p className="text-green-600">✓ Processed</p>
                      )}
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

            {selectedImage && (
              <>
                {/* Settings */}
                <ToolCard title="3. Noise Reduction Strength">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Filter Radius: {strength}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={strength}
                      onChange={(e) => setStrength(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Higher values = more smoothing (slower processing)
                    </p>
                  </div>
                </ToolCard>

                {/* Preview Comparison */}
                <ToolCard title="4. Preview">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Original */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Original</p>
                        <img
                          src={selectedImage.preview}
                          alt="Original"
                          className="w-full h-auto rounded-lg border border-border"
                        />
                      </div>

                      {/* Processed */}
                      {selectedImage.processed && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Denoised
                          </p>
                          <img
                            src={URL.createObjectURL(selectedImage.processed)}
                            alt="Processed"
                            className="w-full h-auto rounded-lg border border-border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </ToolCard>

                {/* Process Button */}
                {!selectedImage.processed && (
                  <button
                    onClick={processNoise}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? 'Processing...' : 'Reduce Noise'}
                  </button>
                )}

                {/* Download Button */}
                {selectedImage.processed && (
                  <button
                    onClick={() => downloadImage(selectedImage)}
                    className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download Denoised Image
                  </button>
                )}
              </>
            )}
          </>
        )}

        {images.length === 0 && (
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm">
            Upload an image to remove noise and grain. Use the strength slider to control the intensity of the effect.
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
