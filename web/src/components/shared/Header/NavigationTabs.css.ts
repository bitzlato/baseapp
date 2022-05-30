import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { headerFontSizes, vars } from 'web/src/theme/vars.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const tabs = style([
  responsiveStyle({
    mobile: {
      top: '14x',
    },
    tablet: {
      top: '18x',
    },
  }),
  sprinkles({
    zIndex: 'dropdown',
  }),
]);

export const tab = style([
  resetStyles.base,
  sprinkles({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 'full',
    mr: '1x',
    px: '4x',
    py: '4x',
    color: { default: 'text', hover: 'headerSubmenuHoverText' },
    textDecoration: { default: 'none', hover: 'none' },
    cursor: 'pointer',
  }),
  {
    fontSize: headerFontSizes.tab,
  },
]);

export const tabActive = style([
  sprinkles({
    color: { default: 'headerSubmenuHoverText', hover: 'headerSubmenuHoverText' },
  }),
  {
    selectors: {
      '&::after': {
        content: '',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        background: vars.colors.headerSubmenuActiveBorder,
      },
    },
  },
]);
