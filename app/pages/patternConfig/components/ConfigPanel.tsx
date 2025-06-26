import { useTranslation } from 'react-i18next';
import { FiInfo } from 'react-icons/fi';

export interface ConfigData {
  fabricCount: number;
  patternWidthStitches: number;
  patternHeightStitches: number;
  maxColors: number;
}

interface ConfigPanelProps {
  config: ConfigData;
  onChange: (config: ConfigData) => void;
  imageDimensions: { width: number; height: number };
  className?: string;
}

const ConfigPanel = ({
  config,
  onChange,
  imageDimensions = { width: 1, height: 1 },
  className = '',
}: ConfigPanelProps) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof ConfigData, value: number) => {
    onChange({ ...config, [field]: value });
  };

  // Calculate dimensions in cm
  const widthCm = (
    (config.patternWidthStitches / config.fabricCount) *
    2.54
  ).toFixed(1);
  const heightCm = (
    (config.patternHeightStitches / config.fabricCount) *
    2.54
  ).toFixed(1);

  // Maintain aspect ratio when one dimension changes
  const handleWidthChange = (width: number) => {
    if (!imageDimensions.width || !imageDimensions.height) {
      onChange({ ...config, patternWidthStitches: width });
      return;
    }

    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const newHeight = Math.round(width / aspectRatio);
    onChange({
      ...config,
      patternWidthStitches: width,
      patternHeightStitches: newHeight,
    });
  };

  const handleHeightChange = (height: number) => {
    if (!imageDimensions.width || !imageDimensions.height) {
      onChange({ ...config, patternHeightStitches: height });
      return;
    }

    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const newWidth = Math.round(height * aspectRatio);
    onChange({
      ...config,
      patternWidthStitches: newWidth,
      patternHeightStitches: height,
    });
  };

  return (
    <>
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Pattern Settings
      </h3>
      <div className={`space-y-6 ${className}`}>
        {/* Fabric Count */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              {t('patternConfig.fabricCount')}
            </label>
            <div className="group relative">
              <FiInfo className="h-4 w-4 cursor-help text-gray-400" />
              <div className="absolute top-0 left-6 z-10 hidden rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                {t('patternConfig.instructions.fabricCount')}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="8"
              max="32"
              step="2"
              value={config.fabricCount}
              onChange={e =>
                handleChange('fabricCount', parseInt(e.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>8</span>
              <span className="font-medium">
                {config.fabricCount} {t('patternConfig.fabricCountUnit')}
              </span>
              <span>32</span>
            </div>
          </div>
        </div>

        {/* Pattern Size */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              {t('patternConfig.patternSize')}
            </label>
            <div className="group relative">
              <FiInfo className="h-4 w-4 cursor-help text-gray-400" />
              <div className="absolute top-0 left-6 z-10 hidden rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                {t('patternConfig.instructions.patternSize')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">
                {t('patternConfig.common.width')} (
                {t('patternConfig.patternSizeStitches')})
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={config.patternWidthStitches}
                onChange={e => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500">
                {widthCm} {t('patternConfig.patternSizeCm')}
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">
                {t('patternConfig.common.height')} (
                {t('patternConfig.patternSizeStitches')})
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={config.patternHeightStitches}
                onChange={e =>
                  handleHeightChange(parseInt(e.target.value) || 0)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500">
                {heightCm} {t('patternConfig.patternSizeCm')}
              </p>
            </div>
          </div>
        </div>

        {/* Max Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              {t('patternConfig.maxColors')}
            </label>
            <div className="group relative">
              <FiInfo className="h-4 w-4 cursor-help text-gray-400" />
              <div className="absolute top-0 left-6 z-10 hidden rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                {t('patternConfig.instructions.maxColors')}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={config.maxColors}
              onChange={e =>
                handleChange('maxColors', parseInt(e.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>5</span>
              <span className="font-medium">{config.maxColors} colors</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Pattern Info */}
        <div className="space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Pattern Preview
          </h4>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Size:</span>
              <span>
                {config.patternWidthStitches} × {config.patternHeightStitches}{' '}
                stitches
              </span>
            </div>
            <div className="flex justify-between">
              <span>Physical size:</span>
              <span>
                {widthCm} × {heightCm} cm
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fabric:</span>
              <span>{config.fabricCount} count</span>
            </div>
            <div className="flex justify-between">
              <span>Colors:</span>
              <span>Max {config.maxColors}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigPanel;
