import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { maxWidth = 800, maxHeight = 600 } = config;

  // Load image and draw on canvas
  const loadImage = useCallback(async () => {
    if (!imageFile || !canvasRef.current) return;

    setIsLoading(true);
    setImageLoaded(false);

    try {
      const img = new Image();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context not available');

      img.onload = () => {
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
      };

      img.onerror = () => {
        setIsLoading(false);
        throw new Error('Failed to load image');
      };

      const url = URL.createObjectURL(imageFile);
      img.src = url;

      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error loading image:', error);
      setIsLoading(false);
    }
  }, [imageFile, maxWidth, maxHeight]);

  // Get canvas data
  const getImageData = useCallback(() => {
    if (!canvasRef.current) return null;
    return canvasRef.current;
  }, []);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return {
    canvasRef,
    isLoading,
    imageLoaded,
    dimensions,
    getImageData,
  };
};
