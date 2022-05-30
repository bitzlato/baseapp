import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { headerFontSizes } from 'web/src/theme/vars.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const item = style([
  resetStyles.base,
  sprinkles({
    color: {
      default: 'headerLinkText',
      hover: 'headerLinkTextHover',
    },
    textDecoration: {
      default: 'none',
      hover: 'none',
    },
    backgroundColor: {
      default: 'transparent',
      hover: 'headerSubmenuBg',
    },
    cursor: 'pointer',
    display: 'flex',
    height: 'full',
    alignItems: 'center',
    py: '5x',
    fontWeight: 'strong',
  }),
  responsiveStyle({
    mobile: {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    desktop: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  }),
  {
    fontSize: headerFontSizes.tabTitle,
  },
]);

export const itemActive = sprinkles({
  color: { default: 'headerLinkTextActive', hover: 'headerLinkTextHover' },
});

export const itemHover = sprinkles({
  color: 'headerLinkTextHover',
  textDecoration: 'none',
  backgroundColor: 'headerSubmenuBg',
});
