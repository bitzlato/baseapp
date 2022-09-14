import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

export const backButton = style(
  responsiveStyle({
    mobile: { display: 'none' },
    desktopXL: { display: 'block' },
  }),
);

export const header = style([
  sprinkles({
    fontFamily: 'brand',
    lineHeight: 'base',
    width: 'full',
  }),
  responsiveStyle({
    mobile: {
      backgroundColor: vars.colors.headerMobileBg,
    },
    tablet: {
      backgroundColor: vars.colors.headerBg,
    },
  }),
]);

globalStyle(`${header} svg`, {
  verticalAlign: 'middle',
});
