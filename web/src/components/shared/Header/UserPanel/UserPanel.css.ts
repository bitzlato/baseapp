import { styleVariants } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

const navigationBase = responsiveStyle({
  tablet: {
    display: 'block',
  },
  desktopXXL: {
    display: 'block',
  },
});

export const navigation = styleVariants({
  base: navigationBase,
  responsiveMode: [
    navigationBase,
    responsiveStyle({
      tablet: {
        display: 'none',
      },
    }),
  ],
});

const signInBase = responsiveStyle({
  mobile: {
    display: 'none',
  },
  desktop: {
    display: 'block',
  },
  desktopXXL: {
    display: 'block',
  },
});

export const signIn = styleVariants({
  base: signInBase,
  responsiveMode: [signInBase, responsiveStyle({ desktop: { display: 'none' } })],
});

const signInMobileBase = responsiveStyle({
  mobile: {
    display: 'flex',
  },
  desktop: {
    display: 'none',
  },
  desktopXXL: {
    display: 'none',
  },
});

export const signInMobile = styleVariants({
  base: signInMobileBase,
  responsiveMode: [signInMobileBase, responsiveStyle({ desktop: { display: 'flex' } })],
});
