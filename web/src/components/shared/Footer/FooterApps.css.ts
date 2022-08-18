import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars } from 'web/src/theme/vars.css';

export const root = style([
  {
    display: 'flex',
  },
  responsiveStyle({
    mobile: {
      gap: sizeVars['8x'],
    },
    tablet: {
      gap: sizeVars['4x'],
    },
  }),
]);

export const icon = style(
  responsiveStyle({
    mobile: {
      width: 150,
      height: 'auto',
    },
    tablet: {
      width: 105,
      height: 'auto',
    },
  }),
);
