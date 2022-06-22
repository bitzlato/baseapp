import { sprinkles } from 'web/src/theme/sprinkles.css';

export const footer = sprinkles({
  fontFamily: 'brand',
});

export const link = sprinkles({
  color: {
    default: 'footerLinkColor',
    hover: 'footerLinkColorHover',
  },
  fontSize: { mobile: 'medium', tablet: 'small' },
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
