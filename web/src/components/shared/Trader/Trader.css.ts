import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

export const leftBlock = style(
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    desktop: {
      width: '20%',
      minWidth: '380px',
      backgroundColor: vars.colors.dropdown,
    },
  }),
);

export const singleContainer = style({
  minHeight: 'calc(100vh - 130px)',
});
