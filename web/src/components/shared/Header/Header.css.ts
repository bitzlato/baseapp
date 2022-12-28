import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { queries, responsiveStyle } from 'web/src/theme/themeUtils';
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

export const snowfall = style([
  {
    selectors: {
      '&::after': {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'block',
        boxShadow: `inset -10px -3px 20px 4px ${vars.colors.headerMobileBg}`,
      },
    },
    '@media': {
      [queries.tablet]: {
        selectors: {
          '&::after': {
            boxShadow: `inset -10px -3px 20px 4px ${vars.colors.headerBg}`,
          },
        },
      },
    },
  },
  responsiveStyle({
    mobile: {
      width: '80px',
      height: '47px',
    },
    tablet: {
      width: '100px',
      height: '63px',
    },
    desktop: {
      width: '130px',
      height: '63px',
    },
  }),
]);

globalStyle(`${header} svg`, {
  verticalAlign: 'middle',
});
