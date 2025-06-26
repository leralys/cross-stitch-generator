import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';

export function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dropzoneRef = useRef<HTMLDivElement>(null);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleScrollToDropzone = () => {
    dropzoneRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleImageUpload = (file: File) => {
    navigate('/config', {
      state: {
        file,
        fileName: file.name,
      },
    });
  };

  return (
    <main className="w-full">
      <Hero onScrollToUpload={handleScrollToDropzone} />

      {/* Content Sections */}
      <div className="container mx-auto space-y-8 p-4">
        {/* Upload Section */}
        <UploadSection ref={dropzoneRef} onImageUpload={handleImageUpload} />
      </div>
    </main>
  );
}
