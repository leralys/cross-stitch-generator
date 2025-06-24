import { useTranslation } from 'react-i18next';
import { GrLinkDown } from 'react-icons/gr';

interface HeroProps {
  onScrollToUpload: () => void;
}

const Hero = ({ onScrollToUpload }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main heading */}
          <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
            <span className="block">{t('appName')}</span>
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-lg text-base text-gray-600 sm:max-w-xl sm:text-lg md:max-w-2xl md:text-xl lg:text-2xl dark:text-gray-300">
            {t('appDescription')}
          </p>

          {/* CTA Button */}
          <button
            onClick={onScrollToUpload}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl focus:outline-none active:scale-95 sm:px-8 sm:py-4 sm:text-lg md:px-10 md:py-5 md:text-xl"
          >
            <span className="relative z-10">{t('actions.create')}</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>

          {/* Scroll indicator */}
          <div className="mt-6 flex flex-col items-center sm:mt-12 md:mt-16">
            <p className="mb-2 text-xs text-gray-500 sm:mb-3 sm:text-sm dark:text-gray-400">
              {t('welcome.hero.scrollToStart')}
            </p>
            <div className="mt-4 animate-bounce">
              <GrLinkDown className="text-gray-400 sm:h-5 sm:w-5 md:h-6 md:w-6 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
