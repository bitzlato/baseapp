import { globalStyle, style } from '@vanilla-extract/css';
import { sizeVars } from 'web/src/theme/vars.css';

export const rowGap3x = style({});
globalStyle(`${rowGap3x} > *:not(:first-child)`, {
  marginLeft: sizeVars['3x'],
});

export const rowGap4x = style({});
globalStyle(`${rowGap4x} > *:not(:first-child)`, {
  marginLeft: sizeVars['4x'],
});

export const rowGap6x = style({});
globalStyle(`${rowGap6x} > *:not(:first-child)`, {
  marginLeft: sizeVars['6x'],
});

export const rowGap8x = style({});
globalStyle(`${rowGap8x} > *:not(:first-child)`, {
  marginLeft: sizeVars['8x'],
});

export const colGap3x = style({});
globalStyle(`${colGap3x} > *:not(:first-child)`, {
  marginTop: sizeVars['3x'],
});

export const colGap4x = style({});
globalStyle(`${colGap4x} > *:not(:first-child)`, {
  marginTop: sizeVars['4x'],
});

export const colGap6x = style({});
globalStyle(`${colGap6x} > *:not(:first-child)`, {
  marginTop: sizeVars['6x'],
});

export const colGap8x = style({});
globalStyle(`${colGap8x} > *:not(:first-child)`, {
  marginTop: sizeVars['8x'],
});
