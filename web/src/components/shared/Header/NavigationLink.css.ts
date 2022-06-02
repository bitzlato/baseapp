import { style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { headerFontSizes, sizeVars } from 'web/src/theme/vars.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const itemBase = style([
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
  {
    fontSize: headerFontSizes.tabTitle,
  },
]);

export const item = styleVariants({
  default: [
    itemBase,
    responsiveStyle({
      mobile: {
        paddingLeft: sizeVars['3x'],
        paddingRight: sizeVars['3x'],
      },
      desktop: {
        paddingLeft: sizeVars['6x'],
        paddingRight: sizeVars['6x'],
      },
    }),
  ],
  withIcon: [
    itemBase,
    responsiveStyle({
      mobile: {
        paddingLeft: sizeVars['2x'],
        paddingRight: sizeVars['3x'],
      },
      desktop: {
        paddingLeft: sizeVars['4x'],
        paddingRight: sizeVars['6x'],
      },
    }),
  ],
});

export const itemActive = sprinkles({
  color: { default: 'headerLinkTextActive', hover: 'headerLinkTextHover' },
});

export const itemHover = sprinkles({
  color: 'headerLinkTextHover',
  textDecoration: 'none',
  backgroundColor: 'headerSubmenuBg',
});
