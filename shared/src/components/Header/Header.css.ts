import { globalStyle, style } from '@vanilla-extract/css';

export const header = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
});

globalStyle(`${header} svg`, {
  verticalAlign: 'middle',
});
