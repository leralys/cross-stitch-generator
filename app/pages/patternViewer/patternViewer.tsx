import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiDownload, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router';

interface PreviewProps {
  file?: File;
  fileName?: string;
}

export const PatternViewer = ({ file, fileName }: PreviewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  const handleDownload = () => {
    if (!objectUrl) return;

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName || 'cross-stitch-pattern.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    // If no file provided, redirect back to home
    if (!file) {
      navigate('/', { replace: true });
      return;
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    setIsLoading(false);
  }, [file, navigate]);

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Should never happen, but just in case
  if (!objectUrl) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <FiArrowLeft className="h-5 w-5" />
                {t('actions.back')}
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pattern Preview
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <FiDownload className="h-4 w-4" />
                {t('actions.download')}
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                <FiSettings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Image Preview */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Original Image
              </h2>
              <div className="flex justify-center">
                <img
                  src={objectUrl}
                  alt="Uploaded image"
                  className="max-h-96 max-w-full rounded-lg shadow-md"
                />
              </div>
              {fileName && (
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  {fileName}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pattern Info */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Pattern Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status:
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Ready for processing
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Colors:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    To be determined
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Size:
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    To be determined
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Next Steps
              </h3>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                  Generate Pattern
                </button>
                <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Adjust Settings
                </button>
                <button
                  onClick={handleBack}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Upload Different Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatternViewer;
