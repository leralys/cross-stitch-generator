import { useTranslation } from 'react-i18next';
import { FiFile, FiX } from 'react-icons/fi';
import { truncateFilename } from '~/utils/fileUtils';
import type { DropzoneFileType } from '../FileDropzone';

interface PreviewProps {
  imageString: string | null;
  fileName: string;
  onClearPreview: () => void;
  fileType: DropzoneFileType;
}

const Preview = ({
  imageString,
  fileName,
  onClearPreview,
  fileType,
}: PreviewProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        {fileType === 'file' ? (
          <div className="flex items-center justify-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-800">
            <FiFile className="h-8 w-8 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {truncateFilename(fileName || '')}
            </span>
          </div>
        ) : (
          imageString && (
            <img
              src={imageString}
              alt="Preview"
              className="max-h-38 max-w-full rounded-lg shadow-md"
            />
          )
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            onClearPreview();
          }}
          className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-gray-400 p-1 text-white transition-colors hover:bg-gray-500"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t(
          fileType === 'image'
            ? 'fileUpload.changeImage'
            : 'fileUpload.changeFile'
        )}
      </p>
    </div>
  );
};

export default Preview;
