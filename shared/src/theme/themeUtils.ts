import { CSSProperties, StyleRule } from '@vanilla-extract/css';

export const breakpoints = {
  // mobile: 0,
  tablet: 768,
  desktop: 992,
  desktopXL: 1200,
  // desktopXXL: 1400,
  desktopXXXL: 1600,
};
type Breakpoints = keyof typeof breakpoints;

export const queries = (Object.keys(breakpoints) as Breakpoints[]).reduce(
  (acc, breakpoint: Breakpoints) => {
    acc[breakpoint] = `screen and (min-width: ${breakpoints[breakpoint]}px)`;

    return acc;
  },
  {} as Record<Breakpoints, string>,
);

interface ResponsiveStyle {
  mobile?: CSSProperties;
  tablet?: CSSProperties;
  desktop?: CSSProperties;
  desktopXL?: CSSProperties;
  // desktopXXL?: CSSProperties;
  desktopXXXL?: CSSProperties;
}

export const responsiveStyle = ({
  mobile,
  tablet,
  desktop,
  desktopXL,
  desktopXXXL,
}: ResponsiveStyle): StyleRule => {
  let styles: StyleRule = {};
  if (mobile) {
    styles = mobile;
  }

  if (tablet || desktop || desktopXL || desktopXXXL) {
    styles['@media'] = {};

    if (tablet) {
      styles['@media'][queries.tablet] = tablet;
    }

    if (desktop) {
      styles['@media'][queries.desktop] = desktop;
    }

    if (desktopXL) {
      styles['@media'][queries.desktopXL] = desktopXL;
    }

    if (desktopXXXL) {
      styles['@media'][queries.desktopXXXL] = desktopXXXL;
    }
  }

  return styles;
};
