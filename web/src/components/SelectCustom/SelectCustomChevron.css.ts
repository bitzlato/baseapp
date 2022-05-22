import { style } from '@vanilla-extract/css';

export const chevron = style({
  transition: 'transform 0.3s ease',
});

export const chevronOpened = style({
  transform: 'rotate(-180deg)',
});
