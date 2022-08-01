import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const submitContainer = style(
  responsiveStyle({
    mobile: {
      width: '100%',
      maxWidth: 400,
    },
    tablet: {
      width: 240,
      maxWidth: '100%',
    },
  }),
);
