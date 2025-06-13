import { useEffect, useState } from 'react';
import { GrActions, GrMoon } from 'react-icons/gr';

const Header = () => {
  // Initialize theme based on what's already applied or saved preference
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      // Check if dark class is already applied (by the script in root.tsx)
      if (document.documentElement.classList.contains('dark')) {
        return 'dark';
      }
      // Check localStorage
      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null;
      if (savedTheme) {
        return savedTheme;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    // Sync with any changes that might have happened before React hydration
    const currentTheme = getInitialTheme();
    if (currentTheme !== theme) {
      setTheme(currentTheme);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white/70 px-4 backdrop-blur-md sm:px-6 md:px-6 lg:px-20 dark:border-gray-700 dark:bg-gray-900/70">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Cross Stitch Generator
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex cursor-pointer items-center justify-center rounded-2xl border border-primary-200 bg-gray-50 p-2 shadow-sm transition-all hover:border-primary-300 hover:bg-gray-100 dark:border-primary-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <GrMoon className="h-5 w-5 text-primary-700" />
          ) : (
            <GrActions className="h-5 w-5 text-primary-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
