import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export interface ImageCanvasConfig {
  maxWidth?: number;
  maxHeight?: number;
}

export const useImageCanvas = (
  imageFile: File | null,
  config: ImageCanvasConfig = {}
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(!!imageFile);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { maxWidth = 800, maxHeight = 600 } = config;

  // Load image and draw on canvas
  const loadImage = useCallback(() => {
    if (!imageFile || !canvasRef.current) {
      console.error('Missing file or canvas, aborting');
      setIsLoading(false);
      setImageLoaded(false);
      return;
    }

    setIsLoading(true);
    setImageLoaded(false);

    const img = new Image();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not available');
      setIsLoading(false);
      return;
    }

    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      try {
        const { width: imgWidth, height: imgHeight } = img;

        // Calculate scaled dimensions to fit canvas while maintaining aspect ratio
        const aspectRatio = imgWidth / imgHeight;
        let canvasWidth = Math.min(imgWidth, maxWidth);
        let canvasHeight = Math.min(imgHeight, maxHeight);

        if (canvasWidth / canvasHeight > aspectRatio) {
          canvasWidth = canvasHeight * aspectRatio;
        } else {
          canvasHeight = canvasWidth / aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw image
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        imageRef.current = img;
        setDimensions({ width: imgWidth, height: imgHeight });
        setImageLoaded(true);
        setIsLoading(false);

        // Clean up URL
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error drawing image:', error);
        setIsLoading(false);
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = error => {
      console.error('Image load error:', error);
      setIsLoading(false);
      setImageLoaded(false);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [imageFile, maxWidth, maxHeight]);

  // Get canvas data
  const getImageData = useCallback(() => {
    if (!canvasRef.current) return null;
    return canvasRef.current;
  }, []);

  // Use layout effect so it runs after DOM mutations but before the browser paints,
  // guaranteeing that refs to DOM elements are already set.
  useLayoutEffect(() => {
    loadImage();
  }, [loadImage]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Clean up any remaining object URLs and image references
      if (imageRef.current) {
        imageRef.current = null;
      }
    };
  }, []);

  return {
    canvasRef,
    isLoading,
    imageLoaded,
    dimensions,
    getImageData,
  };
};
