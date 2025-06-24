import { useCallback, useState } from 'react';
import type { Accept } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { FiFile, FiImage, FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'sonner';

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
  containerClassName?: string;
  acceptedFormats?: Accept;
  maxSize?: number; // in bytes
  fileType?: 'image' | 'file';
}

const FileDropzone = ({
  onFileUpload,
  containerClassName = '',
  acceptedFormats = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB default // TODO: check this
  fileType = 'image',
}: FileDropzoneProps) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const formatsString = Object.values(acceptedFormats)
    .flat()
    .join(', ')
    .toUpperCase();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const rejected = rejectedFiles[0];
        if (rejected.errors.some((e: any) => e.code === 'file-too-large')) {
          toast.error(
            t('fileUpload.fileTooLarge', {
              maxSize: `${Math.round(maxSize / (1024 * 1024))}MB`,
            })
          );
        } else if (
          rejected.errors.some((e: any) => e.code === 'file-invalid-type')
        ) {
          toast.error(
            t('fileUpload.allowedFormats', {
              formats: formatsString,
            })
          );
        } else {
          toast.error(t('fileUpload.invalidFile'));
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Peview file inside the component
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // onFileUpload(file);
        toast.success('Image uploaded successfully!');
      }
    },
    [onFileUpload, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize: maxSize,
    multiple: false,
  });

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary hover:bg-primary/5 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 max-w-full rounded-lg shadow-md"
              />
              <button
                onClick={e => {
                  e.stopPropagation();
                  clearPreview();
                }}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
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
        ) : (
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
                <span>
                  {t('fileUpload.formats', { formats: formatsString })}
                </span>
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
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <FiUpload className="h-4 w-4" />
              {t('actions.upload')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
