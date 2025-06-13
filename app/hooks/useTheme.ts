import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Get theme from various sources with priority order
  const getTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    // 1. Check localStorage (user preference)
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;

    // 2. Check current DOM state (from SSR script)
    if (document.documentElement.classList.contains('dark')) return 'dark';

    // 3. Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Toggle between themes
  const toggleTheme = () => {
    if (!theme) return;

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

  useEffect(() => {
    // Initialize theme on client
    const currentTheme = getTheme();
    setTheme(currentTheme);
    setIsHydrated(true);

    // Ensure DOM is in sync (in case SSR script didn't run)
    applyTheme(currentTheme);

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
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
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
