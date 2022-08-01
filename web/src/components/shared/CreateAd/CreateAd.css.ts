import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars } from 'web/src/theme/vars.css';

export const form = style(
  responsiveStyle({
    mobile: {
      flexShrink: 0,
      flexBasis: '100%',
    },
    desktopXL: {
      flexBasis: '60%',
    },
  }),
);

export const rules = style([
  {
    flexShrink: 1,
    maxWidth: 724,
  },
  responsiveStyle({
    mobile: {
      display: 'none',
    },
    desktopXL: {
      display: 'flex',
    },
  }),
]);

export const rulesMobile = style(
  responsiveStyle({
    mobile: {
      display: 'block',
      paddingTop: sizeVars['3x'],
      paddingBottom: sizeVars['3x'],
      paddingLeft: sizeVars['1x'],
      paddingRight: sizeVars['1x'],
    },
    tablet: {
      paddingLeft: sizeVars['8x'],
      paddingRight: sizeVars['8x'],
    },
    desktopXL: {
      display: 'none',
    },
  }),
);
