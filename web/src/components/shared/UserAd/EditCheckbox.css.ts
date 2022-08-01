import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  minWidth: 90,
  height: 22,
});

globalStyle(`${container} label`, {
  marginBottom: 0,
});
