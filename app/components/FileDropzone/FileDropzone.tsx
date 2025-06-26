import { useCallback, useEffect, useRef, useState } from 'react';
import type { Accept } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Loader from './components/Loader';
import Preview from './components/Preview';
import StartUpload from './components/StartUpload';

export type DropzoneFileType = 'image' | 'file';

interface FileDropzoneProps {
  onFileUpload?: ((file: File) => void) | null;
  containerClassName?: string;
  acceptedFormats?: Accept;
  maxSize?: number; // in bytes
  fileType?: DropzoneFileType;
  shouldShowPreview?: boolean;
  showLoaderDescription?: boolean;
}

const FileDropzone = ({
  onFileUpload = null,
  containerClassName = '',
  acceptedFormats = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB default // TODO: check this
  fileType = 'image',
  shouldShowPreview = true,
  showLoaderDescription = false,
}: FileDropzoneProps) => {
  const { t } = useTranslation();
  const [imageString, setImageString] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // file object
  const [isUploading, setIsUploading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const formatsString = Object.values(acceptedFormats)
    .flat()
    .join(', ')
    .toUpperCase();

  const handleRejection = (rejectedFiles: any[]) => {
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
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        handleRejection(rejectedFiles);
        return;
      }

      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        const file = acceptedFiles[0];

        if (shouldShowPreview) {
          setUploadedFile(file);
        }

        if (fileType === 'image' && shouldShowPreview) {
          const objectUrl = URL.createObjectURL(file);
          objectUrlRef.current = objectUrl;
          setImageString(objectUrl);
        } else if (shouldShowPreview) {
          setImageString(null);
        }

        if (onFileUpload) {
          onFileUpload(file);
          if (!shouldShowPreview) return;
        }

        setIsUploading(false);
        toast.success(t('fileUpload.uploaded'));
      }
    },
    [onFileUpload, maxSize, t, shouldShowPreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize: maxSize,
    multiple: false,
  });

  const clearPreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImageString(null);
    setUploadedFile(null);
  };

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

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

        {isUploading ? (
          <Loader showDescription={showLoaderDescription} />
        ) : uploadedFile && shouldShowPreview ? (
          <Preview
            imageString={imageString}
            fileName={uploadedFile?.name || ''}
            onClearPreview={clearPreview}
            fileType={fileType}
          />
        ) : (
          <StartUpload
            isDragActive={isDragActive}
            fileType={fileType}
            formatsString={formatsString}
            maxSize={maxSize}
          />
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
