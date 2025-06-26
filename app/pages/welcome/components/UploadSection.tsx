import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import FileDropzone from '../../../components/FileDropzone/FileDropzone';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
}

const UploadSection = forwardRef<HTMLDivElement, UploadSectionProps>(
  ({ onImageUpload }, ref) => {
    const { t } = useTranslation();

    return (
      <section ref={ref} className="py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {t('welcome.uploadSection.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('welcome.uploadSection.description')}
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <FileDropzone
            onFileUpload={onImageUpload}
            shouldShowPreview={false}
            showLoaderDescription={true}
          />
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-20 bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-500 dark:text-gray-400">
              {t('common.or')}
            </span>
            <div className="h-px w-20 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div className="mt-4">
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-gray-300 px-6 py-3 text-gray-500 opacity-50 dark:border-gray-600 dark:text-gray-400"
              title={t('imageUpload.comingSoon')}
            >
              {t('welcome.uploadSection.createCustom')}
            </button>
          </div>
        </div>
      </section>
    );
  }
);

// The display name for the component in the dev tools instead of the default "ForwardRef"
UploadSection.displayName = 'UploadSection';

export default UploadSection;
