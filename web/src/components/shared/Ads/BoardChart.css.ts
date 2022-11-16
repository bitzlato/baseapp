import { style, styleVariants } from '@vanilla-extract/css';
import { transitionDurationVars } from 'web/src/theme/vars.css';

export const baseChevron = style({
  transitionProperty: 'transform',
  transitionDuration: transitionDurationVars.base,
});

export const chevroneDown = style({
  position: 'relative',
  transform: 'rotate(0deg)',
});

export const chevroneUp = style({
  position: 'relative',
  transform: 'rotate(180deg)',
});

export const chevrone = styleVariants({
  up: [baseChevron, chevroneUp],
  down: [baseChevron, chevroneDown],
});
