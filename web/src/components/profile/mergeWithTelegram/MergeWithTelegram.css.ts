import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const row = style({
  margin: '0 -16px -32px',
  display: 'flex',
  flexWrap: 'wrap',
});

export const column = style([
  {
    padding: '0 16px',
    marginBottom: 32,
    flex: '0 0 auto',
  },
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    tablet: {
      width: '50%',
    },
  }),
]);
