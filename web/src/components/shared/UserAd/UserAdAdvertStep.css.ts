import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const percentInput = style(
  responsiveStyle({
    tablet: {
      width: 70,
    },
  }),
);

export const valueInput = style(
  responsiveStyle({
    tablet: {
      width: 130,
    },
  }),
);
