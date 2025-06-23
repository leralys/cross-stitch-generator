import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light for SSR
  const [isHydrated, setIsHydrated] = useState(false);

  // Get theme from various sources with priority order
  const getTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    // 1. Check localStorage (user preference)
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;

    // 2. Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Toggle between themes
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Set specific theme
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  useIsomorphicLayoutEffect(() => {
    // Initialize theme on client - read current theme from DOM/localStorage
    const currentTheme = getTheme();
    setTheme(currentTheme);
    setIsHydrated(true);

    // Don't re-apply theme to DOM on initial load since inline script already did it
    // Only apply theme when it changes due to user interaction

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const systemTheme: Theme = e.matches ? 'dark' : 'light';
        setTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  return {
    theme,
    isHydrated,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}
