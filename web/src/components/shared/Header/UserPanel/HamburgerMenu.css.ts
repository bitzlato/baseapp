import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const onlyMobile = style(
  responsiveStyle({
    mobile: {
      display: 'block',
    },
    tablet: {
      display: 'none',
    },
  }),
);
