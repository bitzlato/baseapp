import { style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars, transitionDurationVars, vars } from 'web/src/theme/vars.css';

export const section = style([
  responsiveStyle({
    mobile: {
      backgroundColor: vars.colors.footerSectionBgMobile,
      marginRight: 0,
    },
    tablet: {
      backgroundColor: 'transparent',
      width: '25%',
    },
    desktop: {
      width: 'auto',
      marginRight: sizeVars['4x'],
    },
    desktopXL: {
      marginRight: sizeVars['20x'],
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    ':last-child': {
      marginRight: 0,
    },
  },
]);

export const title = sprinkles({
  color: 'footerTitle',
  fontSize: 'medium',
  fontWeight: 'strong',
  mb: '4x',
});

export const titleButton = style([
  {
    display: 'flex',
    color: vars.colors.footerTitle,
    fontSize: 'medium',
    fontWeight: 'strong',
    textAlign: 'left',
    width: '100%',
    padding: `${sizeVars['5x']} ${sizeVars['6x']}`,
    borderBottom: `1px solid ${vars.colors.footerSectionDividerMobile}`,
  },
  responsiveStyle({
    tablet: {
      display: 'none',
    },
  }),
]);

export const baseChevron = style({
  marginLeft: 'auto',
  transitionProperty: 'transform',
  transitionDuration: transitionDurationVars.base,
});

export const chevronDown = style({
  position: 'relative',
  transform: 'rotate(0deg)',
});

export const chevronRight = style({
  position: 'relative',
  transform: 'rotate(-90deg)',
});

export const chevron = styleVariants({
  right: [baseChevron, chevronRight],
  down: [baseChevron, chevronDown],
});

export const links = style([
  {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 90,
    opacity: 0,
    maxHeight: 0,
    overflow: 'hidden',
    transition:
      'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out',
  },
  responsiveStyle({
    mobile: {
      paddingLeft: sizeVars['12x'],
    },
    tablet: {
      opacity: 1,
      maxHeight: '100%',
      paddingLeft: 0,
    },
  }),
]);

export const linksOpened = style([
  {
    opacity: 1,
    maxHeight: 200,
  },
  responsiveStyle({
    mobile: {
      paddingTop: sizeVars['5x'],
      paddingBottom: sizeVars['5x'],
    },
    tablet: {
      padding: 0,
    },
  }),
]);
