import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const container = sprinkles({
  position: 'relative',
  width: 'full',
});

export const stepButton = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  fontSize: 16,
  zIndex: 100,

  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
});

export const stepButtonMinus = style({
  left: 0,
});

export const stepButtonPlus = style({
  right: 0,
});

export const input = style([
  {
    textAlign: 'center',
  },
  sprinkles({
    fontWeight: 'strong',
    color: 'textMuted',
    px: '5x',
  }),
]);

globalStyle(`${input}::-webkit-outer-spin-button, ${input}::-webkit-inner-spin-button`, {
  WebkitAppearance: 'none',
  margin: 0,
});

globalStyle(`${input}[type=number]`, {
  MozAppearance: 'textfield',
});
