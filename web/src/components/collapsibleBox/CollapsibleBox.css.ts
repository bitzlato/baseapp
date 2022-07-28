import { style, styleVariants } from '@vanilla-extract/css';
import { transitionDurationVars } from 'web/src/theme/vars.css';

export const base = style({
  width: '100%',
  transitionProperty: 'max-height',
  transitionDuration: transitionDurationVars.base,
  position: 'relative',
  overflow: 'hidden',
});

export const baseChevron = style({
  transitionProperty: 'transform',
  transitionDuration: transitionDurationVars.base,
});

export const collapsible = style({
  maxHeight: 0,
});

export const expand = style({
  maxHeight: '100%',
});

export const collapseContent = styleVariants({
  collapse: [base, collapsible],
  expand: [base, expand],
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
