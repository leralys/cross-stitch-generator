export interface DMCColor {
  floss: number | string;
  row: number;
  col: number;
  label: string;
  hex: string;
  rgb: RGBColor;
  lab: LABColor;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface LABColor {
  l: number;
  a: number;
  b: number;
}

export type DMCPalette = DMCColor[];
