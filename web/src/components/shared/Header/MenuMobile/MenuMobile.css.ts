import { style, styleVariants } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import {
  TransitionDurations,
  transitionDurationVars,
  vars,
  zIndexVars,
} from 'web/src/theme/vars.css';

export const MENU_TRANSITION_DURATION = TransitionDurations.base;

export const main = style(
  responsiveStyle({
    mobile: {
      display: 'flex',
    },
    tablet: {
      display: 'none',
    },
  }),
);

const menuBase = style({
  backgroundColor: vars.colors.headerMobileBg,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  transform: 'translateX(100%)',
  transitionProperty: 'opacity, transform',
  transitionDuration: transitionDurationVars.base,
  zIndex: zIndexVars.dropdown,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const menu = styleVariants({
  closed: [menuBase],
  opened: [
    menuBase,
    {
      opacity: 1,
      transform: 'translateX(0)',
    },
  ],
});
