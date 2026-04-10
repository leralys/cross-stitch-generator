import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import NavigateBack from '~/components/NavigateBack';
import type { ConfigData } from '~/pages/patternConfig/components/ConfigPanel';
import type { PatternResult } from '~/utils/patternGeneration';
import { generatePattern } from '~/utils/patternGeneration';
import ColorLegend from './components/ColorLegend';
import PatternGrid from './components/PatternGrid';

interface PatternEditorProps {
  file?: File;
  fileName?: string;
  config?: ConfigData;
  originalFile?: File;
}

const CELL_SIZES = [4, 6, 8, 10, 12, 16, 20] as const;
const DEFAULT_CELL_SIZE = 10;

export const PatternEditor = ({
  file,
  fileName,
  config,
  originalFile,
}: PatternEditorProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pattern, setPattern] = useState<PatternResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cellSize, setCellSize] = useState(DEFAULT_CELL_SIZE);

  // Prefer the original full-resolution file for best quality
  const sourceFile = originalFile ?? file;

  useEffect(() => {
    if (!sourceFile || !config) {
      navigate('/', { replace: true });
      return;
    }

    setIsGenerating(true);
    setError(null);

    generatePattern(
      sourceFile,
      config.patternWidthStitches,
      config.patternHeightStitches,
      config.maxColors
    )
      .then(result => {
        setPattern(result);
        setIsGenerating(false);
      })
      .catch(err => {
        console.error('Pattern generation failed:', err);
        setError(t('patternEditor.generationError'));
        setIsGenerating(false);
      });
  }, [sourceFile, config, navigate, t]);

  const handleBack = () =>
    navigate('/config', {
      replace: true,
      state: { file: sourceFile, fileName },
    });

  if (!sourceFile || !config) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigateBack handleBack={handleBack} />

      <div className="container mx-auto px-4 pb-12">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('patternEditor.title')}
            </h1>
            {fileName && (
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {fileName}
              </p>
            )}
          </div>

          {/* Zoom controls */}
          {pattern && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('patternEditor.zoom')}
              </span>
              <div className="flex gap-1">
                {CELL_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setCellSize(size)}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      cellSize === size
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading state */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-32">
            <BiLoaderAlt className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t('patternEditor.loading')}
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !isGenerating && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Pattern + legend */}
        {pattern && !isGenerating && (
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Grid */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('patternEditor.dimensions', {
                  width: pattern.width,
                  height: pattern.height,
                })}
              </p>
              <PatternGrid pattern={pattern} cellSize={cellSize} />
            </div>

            {/* Legend */}
            <ColorLegend palette={pattern.palette} />
          </div>
        )}
      </div>
    </main>
  );
};

export default PatternEditor;
