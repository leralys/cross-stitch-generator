import { useEffect, useState } from 'react';
import { GrActions, GrMoon } from 'react-icons/gr';

const Header = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-20 dark:border-transparent dark:bg-gray-900">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Cross Stitch Generator
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <GrMoon className="h-5 w-5" />
          ) : (
            <GrActions className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
