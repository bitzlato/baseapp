import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { radiiVars, vars } from 'web/src/theme/vars.css';

export const container = style([
  {
    position: 'relative',
    borderRadius: radiiVars['1x'],
    backgroundColor: vars.colors.userAdEditInputBg,
  },
  responsiveStyle({
    mobile: {
      width: '100%',
      flexGrow: 1,
      maxWidth: '50%',
    },
    tablet: {
      width: 110,
      flexGrow: 0,
      maxWidth: '100%',
    },
  }),
]);

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
    fontSize: 'small',
    fontFamily: 'brand',
    color: 'text',
    backgroundColor: 'transparent',
  }),
  {
    position: 'relative',
    zIndex: 2,
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

export const inputWithPrefix = sprinkles({
  textAlign: 'right',
});

export const inputErrorContainer = style({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

export const inputError = style({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomColor: vars.colors.danger,
});

export const textarea = style([
  {
    width: '100%',
    height: 'auto',
    borderRadius: radiiVars['1x'],
    backgroundColor: vars.colors.userAdEditInputBg,
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
  zIndex: 1,
});

export const suffix = style({
  position: 'absolute',
  top: '50%',
  right: '1px',
  transform: 'translateY(-50%)',
  zIndex: 1,
});
