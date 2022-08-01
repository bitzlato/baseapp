import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const mobileContainer = style([
  {
    overflowX: 'auto',
    '::-webkit-scrollbar': { height: 0 },
  },
  responsiveStyle({
    mobile: {
      display: 'flex',
    },
    desktopXL: {
      display: 'none',
    },
  }),
]);

export const mobileButton = sprinkles({
  borderRadius: 'circle',
});

export const desktopContainer = style(
  responsiveStyle({
    mobile: {
      display: 'none',
    },
    desktopXL: {
      display: 'block',
    },
  }),
);
