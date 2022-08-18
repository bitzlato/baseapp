import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const root = style(
  responsiveStyle({
    mobile: {
      width: '48%',
    },
    tablet: {
      width: 'auto',
    },
  }),
);

export const email = sprinkles({
  color: { default: 'footerEmail', hover: 'footerEmailHover' },
  textDecoration: { hover: 'underline' },
  fontSize: 'caption',
});
