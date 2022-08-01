import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

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

export const mobileControls = style(
  responsiveStyle({
    mobile: {
      backgroundColor: vars.colors.headerBg,
    },
    tablet: {
      backgroundColor: vars.colors.transparent,
    },
  }),
);
