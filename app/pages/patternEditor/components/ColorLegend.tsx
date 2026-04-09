import { useTranslation } from 'react-i18next';
import type { StitchColor } from '~/utils/patternGeneration';

interface ColorLegendProps {
  palette: StitchColor[];
}

function contrastColor(r: number, g: number, b: number): string {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000' : '#fff';
}

const ColorLegend = ({ palette }: ColorLegendProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {t('patternEditor.colorLegend')}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          {t('patternEditor.colorCount', { count: palette.length })}
        </p>
      </div>
      <ul
        className="divide-y divide-gray-100 overflow-y-auto dark:divide-gray-700"
        style={{ maxHeight: '480px' }}
      >
        {palette.map(({ dmcColor, symbol, count }) => {
          const { r, g, b } = dmcColor.rgb;
          return (
            <li
              key={String(dmcColor.floss)}
              className="flex items-center gap-3 px-4 py-2"
            >
              {/* Color swatch with symbol */}
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-black/10 text-xs font-bold"
                style={{
                  backgroundColor: dmcColor.hex,
                  color: contrastColor(r, g, b),
                }}
              >
                {symbol}
              </div>

              {/* DMC info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                  {t('patternEditor.dmcCode', { code: dmcColor.floss })}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {dmcColor.label}
                </p>
              </div>

              {/* Stitch count */}
              <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                {t('patternEditor.stitchCount', { count })}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorLegend;
