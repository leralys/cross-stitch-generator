import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import NavigateBack from '~/components/NavigateBack';
import { useImageCanvas } from '~/hooks/useImageCanvas';
import ConfigPanel, { type ConfigData } from './components/ConfigPanel';

interface PatternConfigProps {
  file?: File;
  fileName?: string;
}

export const PatternConfig = ({ file, fileName }: PatternConfigProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Pattern configuration state
  const [patternConfig, setPatternConfig] = useState<ConfigData>({
    fabricCount: 14,
    patternWidthStitches: 100,
    patternHeightStitches: 100,
    maxColors: 25,
  });

  // Canvas hook for image display
  const { canvasRef, isLoading, imageLoaded, dimensions, getImageData } =
    useImageCanvas(file || null, {
      maxWidth: 600,
      maxHeight: 400,
    });

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  const handleDownload = () => {
    if (!file) return;

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = fileName || 'cross-stitch-pattern.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGeneratePattern = () => {
    if (!file) return;

    // Get the canvas data
    const canvas = getImageData();
    if (!canvas) return;

    // Convert canvas to blob and navigate to next step
    canvas.toBlob(blob => {
      if (blob) {
        const processedFile = new File([blob], 'processed-image.png', {
          type: 'image/png',
        });

        // Navigate to pattern generation with config
        navigate('/pattern-editor', {
          state: {
            file: processedFile,
            fileName: fileName,
            config: patternConfig,
            originalFile: file,
          },
        });
      }
    }, 'image/png');
  };

  // Initialize pattern size based on image dimensions
  useEffect(() => {
    if (dimensions.width && dimensions.height && imageLoaded) {
      const aspectRatio = dimensions.width / dimensions.height;
      const baseWidth = 100;
      const baseHeight = Math.round(baseWidth / aspectRatio);

      setPatternConfig(prev => ({
        ...prev,
        patternWidthStitches: baseWidth,
        patternHeightStitches: baseHeight,
      }));
    }
  }, [dimensions, imageLoaded]);

  useEffect(() => {
    // If no file provided, redirect back to home
    if (!file) {
      navigate('/', { replace: true });
      return;
    }
  }, [file, navigate]);

  if (!file) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigateBack handleBack={handleBack} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Image Preview */}
          <div className="space-y-6 lg:col-span-2">
            {/* Canvas */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Image Preview
                </h2>
              </div>

              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className={`rounded-lg border border-gray-300 shadow-lg dark:border-gray-600 ${
                      imageLoaded ? 'block' : 'hidden'
                    }`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      <BiLoaderAlt className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  )}
                  {/* Placeholder for failed image loading */}
                  {!isLoading && !imageLoaded && (
                    <div className="flex h-64 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-700">
                      <p className="text-gray-700 dark:text-gray-950">
                        Failed to load image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {fileName && (
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  {fileName}
                </p>
              )}
            </div>

            {/* Pattern Preview Info */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                {t('patternConfig.preview')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Original size:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {dimensions.width > 0
                      ? `${dimensions.width} × ${dimensions.height}px`
                      : 'Loading...'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Pattern size:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {patternConfig.patternWidthStitches} ×{' '}
                    {patternConfig.patternHeightStitches} stitches
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Physical size:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(
                      (patternConfig.patternWidthStitches /
                        patternConfig.fabricCount) *
                      2.54
                    ).toFixed(1)}{' '}
                    ×{' '}
                    {(
                      (patternConfig.patternHeightStitches /
                        patternConfig.fabricCount) *
                      2.54
                    ).toFixed(1)}{' '}
                    cm
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Pattern Configuration */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <ConfigPanel
                config={patternConfig}
                onChange={setPatternConfig}
                imageDimensions={dimensions}
              />
            </div>

            {/* Generate Button */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Generate Pattern
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleGeneratePattern}
                  disabled={!imageLoaded}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('patternConfig.generatePattern')}
                </button>
                <button
                  onClick={handleBack}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Upload Different Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatternConfig;
