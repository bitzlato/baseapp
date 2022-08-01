import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const inputBox = style([
  {
    flexShrink: 0,
    flexGrow: 0,
  },
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    desktop: {
      width: '60%',
      maxWidth: 432,
      minWidth: 200,
    },
  }),
]);
