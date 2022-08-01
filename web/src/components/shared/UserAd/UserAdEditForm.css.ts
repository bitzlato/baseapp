import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const submitContainer = style(
  responsiveStyle({
    mobile: {
      position: 'fixed',
      bottom: 90,
      right: 0,
      left: 0,
      padding: '0 20px',
      zIndex: 100,
    },
    tablet: {
      position: 'static',
      padding: 0,
    },
  }),
);

export const submitButtonContainer = style(
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    tablet: {
      width: 'auto',
      minWidth: 180,
    },
  }),
);
