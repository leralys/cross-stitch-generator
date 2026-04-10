import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import dmcPalette from '../assets/dmc_palette.json';
import type { DMCColor, RGBColor } from '../types/colors';
import type { WorkerInput, WorkerOutput } from '../types/pattern';
import { SYMBOLS } from '../types/pattern';

extend([labPlugin]);

function closestDMC(rgb: RGBColor): DMCColor {
  const lab = colord(rgb).toLab();
  let best = dmcPalette[0];
  let minDelta = Infinity;
  for (const dmc of dmcPalette) {
    const delta = colord(lab).delta(dmc.lab);
    if (delta < minDelta) {
      minDelta = delta;
      best = dmc;
    }
  }
  return best;
}

function compute(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  maxColors: number
): WorkerOutput {
  const pixelCount = width * height;

  const pixelDMC: DMCColor[] = new Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const base = i * 4;
    pixelDMC[i] = closestDMC({
      r: data[base],
      g: data[base + 1],
      b: data[base + 2],
    });
  }

  const freq = new Map<string, { color: DMCColor; count: number }>();
  for (const color of pixelDMC) {
    const key = String(color.floss);
    const entry = freq.get(key);
    if (entry) entry.count++;
    else freq.set(key, { color, count: 1 });
  }

  const sorted = [...freq.values()].sort((a, b) => b.count - a.count);
  const kept = sorted.slice(0, maxColors);
  const keptKeys = new Set(kept.map(c => String(c.color.floss)));

  const remapCache = new Map<string, DMCColor>();
  function remap(color: DMCColor): DMCColor {
    const key = String(color.floss);
    if (keptKeys.has(key)) return color;
    const cached = remapCache.get(key);
    if (cached) return cached;
    let best = kept[0].color;
    let minDelta = Infinity;
    for (const { color: k } of kept) {
      const delta = colord(color.rgb).delta(k.rgb);
      if (delta < minDelta) {
        minDelta = delta;
        best = k;
      }
    }
    remapCache.set(key, best);
    return best;
  }

  const palette = kept.map((item, i) => ({
    dmcColor: item.color,
    symbol: SYMBOLS[i % SYMBOLS.length],
    count: 0,
  }));

  const paletteIndex = new Map<string, number>();
  palette.forEach((item, i) =>
    paletteIndex.set(String(item.dmcColor.floss), i)
  );

  const grid = new Uint16Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const mapped = remap(pixelDMC[i]);
    const idx = paletteIndex.get(String(mapped.floss))!;
    grid[i] = idx;
    palette[idx].count++;
  }

  return { grid: grid.buffer, palette, width, height };
}

self.onmessage = (e: MessageEvent<WorkerInput>) => {
  const { pixels, width, height, maxColors } = e.data;
  const data = new Uint8ClampedArray(pixels);
  const result = compute(data, width, height, maxColors);
  postMessage(result, { transfer: [result.grid] });
};
