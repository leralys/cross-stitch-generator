import type {
  PatternResult,
  WorkerInput,
  WorkerOutput,
} from '../types/pattern';

export { SYMBOLS } from '../types/pattern';
export type { PatternResult, StitchColor } from '../types/pattern';

export async function generatePattern(
  imageFile: File,
  width: number,
  height: number,
  maxColors: number
): Promise<PatternResult> {
  const img = await loadImage(imageFile);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data.buffer.slice(0);

  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/patternGeneration.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (e: MessageEvent<WorkerOutput>) => {
      worker.terminate();
      const { grid: gridBuffer, palette, width: w, height: h } = e.data;
      resolve({
        grid: new Uint16Array(gridBuffer),
        palette,
        width: w,
        height: h,
      });
    };

    worker.onerror = err => {
      worker.terminate();
      reject(err);
    };

    const msg: WorkerInput = { pixels, width, height, maxColors };
    worker.postMessage(msg, [pixels]);
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = e => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}
