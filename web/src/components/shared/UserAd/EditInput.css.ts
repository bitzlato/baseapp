import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';

export const container = style({
  position: 'relative',
  width: 90,
});

export const input = style([
  sprinkles({
    px: '1.5x',
    borderColor: 'transparent',
    borderTopWidth: '0',
    borderLeftWidth: '0',
    borderRightWidth: '0',
    borderBottomWidth: '1x',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    borderRadius: '1x',
    fontSize: 'small',
    color: 'text',
    backgroundColor: 'userAdEditInputBg',
    textAlign: 'right',
  }),
  {
    width: '100%',
    height: 22,
    outlineOffset: '-1px',
    '::placeholder': { color: vars.colors.inputPlaceholder },
    boxSizing: 'border-box',
    selectors: {
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    },
  },
]);

export const inputError = style({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomColor: vars.colors.danger,
});

export const textarea = style([
  {
    width: '100%',
    height: 'auto',
    textAlign: 'left',
  },
  sprinkles({
    py: '2x',
  }),
]);

export const prefix = style({
  position: 'absolute',
  top: '50%',
  left: '1px',
  transform: 'translateY(-50%)',
});
