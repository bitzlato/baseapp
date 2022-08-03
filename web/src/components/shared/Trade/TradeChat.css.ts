import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const chat = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  responsiveStyle({
    mobile: {
      flex: 1,
      height: '100%',
    },
    tablet: {
      flex: 'initial',
      height: 620,
    },
  }),
]);
