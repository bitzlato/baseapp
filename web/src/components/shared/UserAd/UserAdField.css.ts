import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const container = style(
  responsiveStyle({
    mobile: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    tablet: {
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
  }),
);

export const value = style([
  {
    maxWidth: '100%',
  },
  responsiveStyle({
    tablet: {
      minWidth: 90,
    },
  }),
]);
