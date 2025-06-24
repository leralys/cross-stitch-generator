import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = ({ showDescription = false }: { showDescription?: boolean }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        showDescription ? 'py-14' : 'py-18'
      }`}
    >
      <BiLoaderAlt className="h-12 w-12 animate-spin text-primary" />
      {showDescription && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {t('fileUpload.uploading')}
        </p>
      )}
    </div>
  );
};

export default Loader;
