import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars } from 'web/src/theme/vars.css';

export const footer = sprinkles({
  fontFamily: 'brand',
  bg: 'footerBg',
});

export const footerContainer = style([
  {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  responsiveStyle({
    tablet: {
      width: 720,
    },
    desktop: {
      width: 960,
    },
    desktopXL: {
      width: 1140,
    },
    desktopXXL: {
      width: 1320,
    },
    desktopXXXL: {
      width: 1560,
    },
  }),
]);

export const leftColumn = style(
  responsiveStyle({
    tablet: {
      width: 'auto',
      marginRight: sizeVars['4x'],
      marginLeft: sizeVars['2x'],
    },
    desktop: {
      width: 242,
      marginRight: 0,
      marginLeft: 0,
      paddingLeft: sizeVars['4x'],
    },
  }),
);

export const rightColumn = style(
  responsiveStyle({
    mobile: {
      marginLeft: '0',
    },
    tablet: {
      width: 'auto',
      marginRight: sizeVars['2x'],
      marginLeft: 'auto',
    },
    desktop: {
      width: 226,
      marginRight: 0,
    },
  }),
);

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

export const copyright = style(
  responsiveStyle({
    mobile: {
      order: 3,
    },
    tablet: {
      order: 1,
    },
  }),
);
export const socialNetworks = style(
  responsiveStyle({
    mobile: {
      order: 1,
      padding: `${sizeVars['4x']} 0 ${sizeVars['8x']}`,
    },
    tablet: {
      order: 2,
      padding: 0,
    },
  }),
);

export const apps = style(
  responsiveStyle({
    mobile: {
      order: 2,
      paddingBottom: sizeVars['6x'],
    },
    tablet: {
      order: 3,
      paddingBottom: 0,
    },
  }),
);
