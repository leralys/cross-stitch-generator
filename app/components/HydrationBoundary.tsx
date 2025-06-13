import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../contexts/ThemeContext';

interface HydrationBoundaryProps {
  children: React.ReactNode;
}

export default function HydrationBoundary({
  children,
}: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isHydrated: themeHydrated } = useThemeContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Only show content when both theme and language are ready
    if (themeHydrated && i18n.isInitialized) {
      // Small delay to ensure everything is settled
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [themeHydrated, i18n.isInitialized]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-gray-900">
        {/* Optional: Add a subtle loading indicator */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/70 px-4 backdrop-blur-md sm:px-6 md:px-6 lg:px-20 dark:border-gray-700 dark:bg-gray-900/70">
          <div className="h-6 w-60 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-9 w-9 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          {/* TODO: Add a skeleton that matches hero section */}
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-96 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto mb-8 h-6 w-80 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-12 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
