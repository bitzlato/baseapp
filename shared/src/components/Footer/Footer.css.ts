import { style } from '@vanilla-extract/css';
import { sprinkles } from 'shared/src/theme/sprinkles.css';

export const footer = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
});

export const link = sprinkles({
  color: {
    default: 'footerLinkColor',
    hover: 'footerLinkColorHover',
  },
  fontSize: ['medium', 'small'],
  textDecoration: {
    default: 'none',
    hover: 'underline',
  },
});

export const socialNetwork = sprinkles({
  display: 'block',
  color: {
    default: 'footerSocialIcon',
    hover: 'footerSocialIconHover',
  },
  size: '7x',
});
