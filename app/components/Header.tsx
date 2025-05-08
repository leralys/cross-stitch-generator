import { useEffect, useState } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

const Header = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Cross Stitch Generator
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="GitHub"
        >
          <VscGithubInverted size={20} />
        </a>

        <button
          onClick={toggleTheme}
          className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌚' : '🌞'}
        </button>
      </div>
    </header>
  );
};

export default Header;
