import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';
import type { PatternResult } from '~/utils/patternGeneration';

interface PatternGridProps {
  pattern: PatternResult;
  cellSize: number;
}

// Bold guide lines every N stitches (like graph paper)
const GUIDE_INTERVAL = 10;

const PatternGrid = ({ pattern, cellSize }: PatternGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { grid, palette, width, height } = pattern;

    canvas.width = width * cellSize;
    canvas.height = height * cellSize;

    // Draw colored cells and symbols
    const showSymbols = cellSize >= 8;
    const fontSize = Math.floor(cellSize * 0.6);
    if (showSymbols) {
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    }

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const { dmcColor, symbol } = palette[grid[row][col]];
        const x = col * cellSize;
        const y = row * cellSize;

        ctx.fillStyle = dmcColor.hex;
        ctx.fillRect(x, y, cellSize, cellSize);

        if (showSymbols) {
          const { r, g, b } = dmcColor.rgb;
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          ctx.fillStyle =
            luminance > 0.5 ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)';
          ctx.fillText(symbol, x + cellSize / 2, y + cellSize / 2);
        }
      }
    }

    // Fine grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.5;
    for (let col = 0; col <= width; col++) {
      if (col % GUIDE_INTERVAL === 0) continue;
      ctx.beginPath();
      ctx.moveTo(col * cellSize, 0);
      ctx.lineTo(col * cellSize, height * cellSize);
      ctx.stroke();
    }
    for (let row = 0; row <= height; row++) {
      if (row % GUIDE_INTERVAL === 0) continue;
      ctx.beginPath();
      ctx.moveTo(0, row * cellSize);
      ctx.lineTo(width * cellSize, row * cellSize);
      ctx.stroke();
    }

    // Bold guide lines every GUIDE_INTERVAL stitches
    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.lineWidth = 1;
    for (let col = 0; col <= width; col += GUIDE_INTERVAL) {
      ctx.beginPath();
      ctx.moveTo(col * cellSize, 0);
      ctx.lineTo(col * cellSize, height * cellSize);
      ctx.stroke();
    }
    for (let row = 0; row <= height; row += GUIDE_INTERVAL) {
      ctx.beginPath();
      ctx.moveTo(0, row * cellSize);
      ctx.lineTo(width * cellSize, row * cellSize);
      ctx.stroke();
    }
  }, [pattern, cellSize]);

  return (
    <div className="overflow-auto rounded-lg border border-gray-300 dark:border-gray-600">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PatternGrid;
