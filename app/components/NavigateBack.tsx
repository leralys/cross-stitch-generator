import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';

export const NavigateBack = ({ handleBack }: { handleBack: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="container px-4 py-4">
      <button
        onClick={handleBack}
        className="flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <FiArrowLeft className="h-5 w-5" />
        {t('actions.back')}
      </button>
    </div>
  );
};

export default NavigateBack;
