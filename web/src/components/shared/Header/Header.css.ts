import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const backButton = style(
  responsiveStyle({
    mobile: { display: 'none' },
    desktopXL: { display: 'block' },
  }),
);

export const header = sprinkles({
  fontFamily: 'brand',
  lineHeight: 'base',
});

globalStyle(`${header} svg`, {
  verticalAlign: 'middle',
});
