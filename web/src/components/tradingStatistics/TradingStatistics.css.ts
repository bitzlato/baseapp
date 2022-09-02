import { globalStyle, style } from '@vanilla-extract/css';

export const cryptoCurrency = style({
  width: 240,
});

export const market = style({
  width: 360,
});

export const chart = style({
  position: 'relative',
  minHeight: 660,
});

globalStyle(`${chart} > .pg-trading-chart`, {
  position: 'absolute',
});
