import { useTranslation } from 'react-i18next';
import { FiFile, FiImage, FiUpload } from 'react-icons/fi';
import type { DropzoneFileType } from '../FileDropzone';

interface StartUploadProps {
  isDragActive: boolean;
  fileType: DropzoneFileType;
  formatsString: string;
  maxSize: number;
}

const StartUpload = ({
  isDragActive,
  fileType,
  formatsString,
  maxSize,
}: StartUploadProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {isDragActive ? (
          fileType === 'image' ? (
            <FiImage className="h-12 w-12 text-primary" />
          ) : (
            <FiFile className="h-12 w-12 text-primary" />
          )
        ) : (
          <FiUpload className="h-12 w-12 text-gray-400" />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {isDragActive
            ? t(
                fileType === 'image'
                  ? 'fileUpload.dropImageHere'
                  : 'fileUpload.dropFileHere'
              )
            : t(
                fileType === 'image'
                  ? 'fileUpload.uploadImage'
                  : 'fileUpload.uploadFile'
              )}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t(
            fileType === 'image'
              ? 'fileUpload.dragDropImage'
              : 'fileUpload.dragDropFile'
          )}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          <span>{t('fileUpload.formats', { formats: formatsString })}</span>
          <span className="mx-2">•</span>
          <span>
            {t('fileUpload.maxSize', {
              maxSize: `${Math.round(maxSize / (1024 * 1024))}MB`,
            })}
          </span>
        </p>
      </div>

      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        <FiUpload className="h-4 w-4" />
        {t('actions.upload')}
      </button>
    </div>
  );
};
export default StartUpload;
