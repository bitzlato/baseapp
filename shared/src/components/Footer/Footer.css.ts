import { style } from '@vanilla-extract/css';
import { sprinkles } from 'theme/sprinkles.css';

export const footer = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
});

export const title = sprinkles({
  color: 'footerTitle',
  fontSize: 'small',
  fontWeight: '600',
  mb: '4x',
  textTransform: 'uppercase',
});

export const links = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    mr: '5x',
    mb: '9x',
  }),
  {
    minWidth: 90,
    whiteSpace: 'nowrap',
  },
]);

export const link = sprinkles({
  color: {
    default: 'footerLinkColor',
    hover: 'footerLinkColorHover',
  },
  fontSize: 'small',
  textDecoration: {
    default: 'none',
    hover: 'underline',
  },
});

export const socialNetwork = sprinkles({
  color: {
    default: 'footerSocialIcon',
    hover: 'footerSocialIconHover',
  },
  size: '7x',
});
