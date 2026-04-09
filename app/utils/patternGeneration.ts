import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import type { DMCColor, RGBColor } from '~/types/colors';
import { closestDMC } from './colorUtils';

extend([labPlugin]);

// Printable symbols assigned to palette colors (for print legibility)
export const SYMBOLS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '/',
  '@',
  '#',
  '$',
  '%',
  '&',
  '*',
  '=',
  '~',
  '<',
  '>',
  '!',
  '?',
  '^',
];

export interface StitchColor {
  dmcColor: DMCColor;
  symbol: string;
  count: number;
}

export interface PatternResult {
  /** Row-major 2D array of palette indices */
  grid: Uint16Array[];
  palette: StitchColor[];
  width: number;
  height: number;
}

/**
 * Generates a cross-stitch pattern from an image file.
 *
 * Steps:
 * 1. Render image to an offscreen canvas at pattern dimensions
 * 2. Map every pixel to its closest DMC thread color
 * 3. Keep the top `maxColors` by frequency; remap the rest to the nearest kept color
 * 4. Build the final grid and palette
 */
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
  const { data } = ctx.getImageData(0, 0, width, height);

  // --- Step 1: map every pixel to its closest DMC color ---
  const pixelCount = width * height;
  const pixelDMC: DMCColor[] = new Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const base = i * 4;
    const rgb: RGBColor = {
      r: data[base],
      g: data[base + 1],
      b: data[base + 2],
    };
    pixelDMC[i] = closestDMC(rgb);
  }

  // --- Step 2: count frequencies ---
  const freq = new Map<string, { color: DMCColor; count: number }>();
  for (const color of pixelDMC) {
    const key = String(color.floss);
    const entry = freq.get(key);
    if (entry) {
      entry.count++;
    } else {
      freq.set(key, { color, count: 1 });
    }
  }

  // --- Step 3: keep top `maxColors` ---
  const sorted = [...freq.values()].sort((a, b) => b.count - a.count);
  const kept = sorted.slice(0, maxColors);
  const keptKeys = new Set(kept.map(c => String(c.color.floss)));

  // Remap dropped colors to nearest kept color (by perceptual LAB distance)
  const remapCache = new Map<string, DMCColor>();
  const remap = (color: DMCColor): DMCColor => {
    const key = String(color.floss);
    if (keptKeys.has(key)) return color;
    const cached = remapCache.get(key);
    if (cached) return cached;

    let best = kept[0].color;
    let minDelta = Infinity;
    for (const { color: keptColor } of kept) {
      const delta = colord(color.rgb).delta(keptColor.rgb);
      if (delta < minDelta) {
        minDelta = delta;
        best = keptColor;
      }
    }
    remapCache.set(key, best);
    return best;
  };

  // --- Step 4: build palette and grid ---
  const palette: StitchColor[] = kept.map((item, i) => ({
    dmcColor: item.color,
    symbol: SYMBOLS[i % SYMBOLS.length],
    count: 0,
  }));

  const paletteIndex = new Map<string, number>();
  palette.forEach((item, i) =>
    paletteIndex.set(String(item.dmcColor.floss), i)
  );

  const grid: Uint16Array[] = [];
  let pixelIdx = 0;
  for (let row = 0; row < height; row++) {
    const gridRow = new Uint16Array(width);
    for (let col = 0; col < width; col++) {
      const mapped = remap(pixelDMC[pixelIdx++]);
      const idx = paletteIndex.get(String(mapped.floss))!;
      gridRow[col] = idx;
      palette[idx].count++;
    }
    grid.push(gridRow);
  }

  return { grid, palette, width, height };
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
