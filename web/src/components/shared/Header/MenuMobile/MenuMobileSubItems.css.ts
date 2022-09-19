import { style, styleVariants } from '@vanilla-extract/css';
import { fontSizeVars, sizeVars, transitionDurationVars, vars } from 'web/src/theme/vars.css';

const itemsBase = style({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: sizeVars['12x'],
  opacity: 0,
  maxHeight: 0,
  overflow: 'hidden',
  transitionProperty: 'opacity, max-height, padding-top',
  transitionDuration: transitionDurationVars.base,
  transitionTimingFunction: 'ease-in-out',
});

export const items = styleVariants({
  closed: [itemsBase],
  opened: [
    itemsBase,
    {
      opacity: 1,
      maxHeight: 200,
      paddingTop: sizeVars['2x'],
    },
  ],
});

const itemBase = style({
  marginBottom: sizeVars['6x'],
  fontSize: fontSizeVars.small,
  fontWeight: 600,
  color: vars.colors.menuMobileSubItem,
  selectors: {
    '&:hover': {
      color: vars.colors.menuMobileSubItemActive,
    },
  },
});

export const item = styleVariants({
  base: [itemBase],
  active: [
    itemBase,
    {
      color: vars.colors.menuMobileSubItemActive,
    },
  ],
});
