import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white/70 px-4 backdrop-blur-md sm:px-6 md:px-6 lg:px-20 dark:border-gray-700 dark:bg-gray-900/70">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        {t('appNameShort')}
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
