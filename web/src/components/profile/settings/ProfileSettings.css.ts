import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const block = style([
  {
    margin: -18,
    paddingLeft: 18,
    paddingRight: 18,
  },
  responsiveStyle({
    mobile: {
      flexDirection: 'column',
    },
    tablet: {
      flexDirection: 'row',
    },
  }),
]);

export const label = style(
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    tablet: {
      width: '35%',
    },
  }),
);

export const controls = style(
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    tablet: {
      width: '55%',
    },
  }),
);
