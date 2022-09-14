import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

export const tablet = style(
  responsiveStyle({
    mobile: {
      display: 'none',
    },
    tablet: {
      display: 'block',
    },
  }),
);

export const mobile = style(
  responsiveStyle({
    mobile: {
      display: 'block',
    },
    tablet: {
      display: 'none',
    },
  }),
);

export const logo = style({
  display: 'block',
  height: '100%',
  width: 'auto',
  objectFit: 'contain',
  maxHeight: 60,
  maxWidth: 120,
});

export const beta = style({
  color: vars.colors.beta,
  left: 42,
  position: 'absolute',
  top: 34,
  width: 26,
});

export const svg = style({
  display: 'block',
});
