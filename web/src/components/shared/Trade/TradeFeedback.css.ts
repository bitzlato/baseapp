import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const feedbackBlock = style([
  {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  responsiveStyle({
    desktopXL: {
      flexDirection: 'row',
      gap: '28px',
    },
    mobile: {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  }),
]);
