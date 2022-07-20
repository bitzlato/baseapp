import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

export const notice = style(
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
    },
    tablet: {
      maxWidth: 410,
    },
  }),
);

export const createNotice = style(
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
    },
    tablet: {
      maxWidth: 510,
    },
  }),
);

export const form = style(
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
      background: vars.colors.block,
    },
    desktop: {
      maxWidth: 620,
    },
  }),
);
