import { style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { transitionDurationVars } from 'web/src/theme/vars.css';

export const item = sprinkles({
  display: 'flex',
  alignItems: 'center',
  py: '5x',
  px: '6x',
  textAlign: 'left',
  color: {
    default: 'menuMobileItemText',
    hover: 'menuMobileItemText',
  },
  fontSize: 'medium',
  fontWeight: 'strong',
  borderBottomWidth: '1x',
  borderBottomStyle: 'solid',
  borderBottomColor: 'menuMobileItemBorder',
  textDecoration: {
    default: 'none',
    hover: 'none',
  },
});

export const icon = sprinkles({
  color: 'menuMobileItemIcon',
  size: '6x',
  mr: '4x',
});

export const baseChevron = style({
  marginLeft: 'auto',
  transitionProperty: 'transform',
  transitionDuration: transitionDurationVars.base,
});

export const chevronTop = style({
  position: 'relative',
  transform: 'rotate(180deg)',
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
  top: [baseChevron, chevronTop],
  right: [baseChevron, chevronRight],
  down: [baseChevron, chevronDown],
});
