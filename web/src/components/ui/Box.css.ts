import { globalStyle, style } from '@vanilla-extract/css';
import { sizeVars } from 'web/src/theme/vars.css';

export const rowGap1x = style({});
globalStyle(`${rowGap1x} > *:not(:first-child)`, {
  marginLeft: sizeVars['1x'],
});

export const rowGap2x = style({});
globalStyle(`${rowGap2x} > *:not(:first-child)`, {
  marginLeft: sizeVars['2x'],
});

export const rowGap3x = style({});
globalStyle(`${rowGap3x} > *:not(:first-child)`, {
  marginLeft: sizeVars['3x'],
});

export const rowGap4x = style({});
globalStyle(`${rowGap4x} > *:not(:first-child)`, {
  marginLeft: sizeVars['4x'],
});

export const rowGap5x = style({});
globalStyle(`${rowGap5x} > *:not(:first-child)`, {
  marginLeft: sizeVars['5x'],
});

export const rowGap6x = style({});
globalStyle(`${rowGap6x} > *:not(:first-child)`, {
  marginLeft: sizeVars['6x'],
});

export const rowGap7x = style({});
globalStyle(`${rowGap7x} > *:not(:first-child)`, {
  marginLeft: sizeVars['7x'],
});

export const rowGap8x = style({});
globalStyle(`${rowGap8x} > *:not(:first-child)`, {
  marginLeft: sizeVars['8x'],
});

export const colGap1x = style({});
globalStyle(`${colGap1x} > *:not(:first-child)`, {
  marginTop: sizeVars['1x'],
});

export const colGap2x = style({});
globalStyle(`${colGap2x} > *:not(:first-child)`, {
  marginTop: sizeVars['2x'],
});

export const colGap3x = style({});
globalStyle(`${colGap3x} > *:not(:first-child)`, {
  marginTop: sizeVars['3x'],
});

export const colGap4x = style({});
globalStyle(`${colGap4x} > *:not(:first-child)`, {
  marginTop: sizeVars['4x'],
});

export const colGap5x = style({});
globalStyle(`${colGap5x} > *:not(:first-child)`, {
  marginTop: sizeVars['5x'],
});

export const colGap6x = style({});
globalStyle(`${colGap6x} > *:not(:first-child)`, {
  marginTop: sizeVars['6x'],
});

export const colGap7x = style({});
globalStyle(`${colGap7x} > *:not(:first-child)`, {
  marginTop: sizeVars['7x'],
});

export const colGap8x = style({});
globalStyle(`${colGap8x} > *:not(:first-child)`, {
  marginTop: sizeVars['8x'],
});
