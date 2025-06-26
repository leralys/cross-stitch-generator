import { colord, extend } from 'colord';
import labPlugin from 'colord/plugins/lab';
import type { DMCColor, RGBColor } from '~/types/colors';
import dmcPalette from '../assets/dmc_palette.json';

extend([labPlugin]);

/**
 * Finds the closest DMC thread color to a given RGB color using the Delta E2000 algorithm
 *
 * @param rgb - The RGB color to match against DMC colors
 * @returns The DMC color with the smallest perceptual difference
 */
export const closestDMC = (rgb: RGBColor): DMCColor => {
  const lab = colord(rgb).toLab();

  let best = dmcPalette[0];
  let minDelta = Infinity;

  for (let i = 0; i < dmcPalette.length; i++) {
    const dmc = dmcPalette[i];
    const delta = colord(lab).delta(dmc.lab);
    if (delta < minDelta) {
      minDelta = delta;
      best = dmc;
    }
  }
  return best;
};
