import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars } from 'web/src/theme/vars.css';

export const root = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    mx: {
      mobile: 'auto',
      desktop: '0',
    },
  }),
  responsiveStyle({
    mobile: {
      gap: sizeVars['14x'],
    },
    tablet: {
      gap: sizeVars['8x'],
    },
  }),
]);

export const socialNetwork = sprinkles({
  display: 'block',
  color: {
    default: 'footerSocialIcon',
    hover: 'footerSocialIconHover',
  },
});
