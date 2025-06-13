import { useTranslation } from 'react-i18next';
import { GrActions, GrMoon } from 'react-icons/gr';
import { useThemeContext } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({
  className = '',
  size = 'md',
}: ThemeToggleProps) {
  const { isHydrated, toggleTheme, isDark } = useThemeContext();
  const { t } = useTranslation();

  const sizeClasses = {
    sm: 'h-8 w-8 p-1.5',
    md: 'h-9 w-9 p-2',
    lg: 'h-10 w-10 p-2.5',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Show placeholder during hydration to prevent layout shift
  if (!isHydrated) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={` ${sizeClasses[size]} flex cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-200 ease-in-out hover:border-gray-300 hover:bg-gray-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-900 ${className} `}
      aria-label={t('theme.toggle')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
    >
      <div className="relative">
        {isDark ? (
          <GrActions
            className={`${iconSizes[size]} text-primary-100 transition-colors duration-200`}
            aria-hidden="true"
          />
        ) : (
          <GrMoon
            className={`${iconSizes[size]} text-primary-600 transition-colors duration-200`}
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
}
