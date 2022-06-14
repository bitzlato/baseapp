import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const layoutWithoutSidebar = style(
  responsiveStyle({
    mobile: {
      display: 'flex',
    },
    desktopXL: {
      display: 'none',
    },
  }),
);

export const layoutWithSidebar = style(
  responsiveStyle({
    mobile: {
      display: 'none',
    },
    desktopXL: {
      display: 'flex',
    },
  }),
);

export const filter = style(
  responsiveStyle({
    desktopXL: {
      width: '340px',
    },
    desktopXXL: {
      width: '380px',
    },
  }),
);
