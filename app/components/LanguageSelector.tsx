import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';

import { useClickOutside } from '../hooks/useClickOutside';
import { languages } from '../i18n/languages';

interface LanguageSelectorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageSelector = ({
  className = '',
  size = 'md',
}: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle outside clicks
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dropdownRef = useClickOutside<HTMLDivElement>(handleClose);

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

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', languageCode);
  };

  const currentLanguage =
    languages.find(lang => lang.code === i18n.language) || languages[0];

  // Show placeholder during hydration
  if (!isHydrated) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={` ${sizeClasses[size]} flex cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-200 ease-in-out hover:border-gray-300 hover:bg-gray-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-900 ${className} `}
        aria-label={t('language.select')}
        title={t('language.current', { language: currentLanguage.nativeName })}
      >
        <GrLanguage
          className={`${iconSizes[size]} text-primary-600 transition-colors duration-200 dark:text-primary-100`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            {t('language.select')}
          </div>

          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                i18n.language === language.code
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              } `}
            >
              <div className="flex items-center justify-between">
                <span>{language.nativeName}</span>
                {i18n.language === language.code && (
                  <div className="h-2 w-2 rounded-full bg-primary-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
