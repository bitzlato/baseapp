import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const blockedAmount = style(
  responsiveStyle({
    mobile: {
      textAlign: 'center',
    },
    tablet: {
      textAlign: 'left',
    },
  }),
);

export const mobileTableContainer = style({
  overflowX: 'auto',
});

export const mobileCol = style({
  width: 130,
});

export const emptyContent = style({
  maxWidth: 247,
});
