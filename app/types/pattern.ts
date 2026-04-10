import type { DMCColor } from './colors';

export interface StitchColor {
  dmcColor: DMCColor;
  symbol: string;
  count: number;
}

export interface PatternResult {
  /** Flat row-major array: grid[row * width + col] = palette index */
  grid: Uint16Array;
  palette: StitchColor[];
  width: number;
  height: number;
}

export interface WorkerInput {
  pixels: ArrayBuffer;
  width: number;
  height: number;
  maxColors: number;
}

export interface WorkerOutput {
  grid: ArrayBuffer;
  palette: StitchColor[];
  width: number;
  height: number;
}

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
