import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const statusSwitch = style([
  sprinkles({
    width: 'full',
  }),
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
    },
    tablet: {
      maxWidth: 150,
    },
  }),
]);
