import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

// Get initial language synchronously to prevent flashes
const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';

  // Check localStorage first (highest priority)
  const saved = localStorage.getItem('i18nextLng');
  if (saved && (saved === 'en' || saved === 'ru')) return saved;

  // Check navigator language (second priority)
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ru')) return 'ru';

  return 'en';
};

// Initialize with detected language immediately
const initialLanguage = getInitialLanguage();

// Initialize i18n synchronously with the detected language
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
