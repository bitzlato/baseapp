import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const row = style([
  {
    display: 'grid',
    gap: 24,
  },
  responsiveStyle({
    mobile: {
      gridTemplateColumns: '1fr',
    },
    tablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  }),
]);
