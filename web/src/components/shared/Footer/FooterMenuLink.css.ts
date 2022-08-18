import { sprinkles } from 'web/src/theme/sprinkles.css';

export const link = sprinkles({
  color: {
    default: 'footerLinkColor',
    hover: 'footerLinkColorHover',
  },
  fontSize: { mobile: 'medium', tablet: 'caption' },
  textDecoration: {
    default: 'none',
    hover: 'underline',
  },
  mb: '1x',
});
