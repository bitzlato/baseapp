import { style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { transitionDurationVars, vars } from 'web/src/theme/vars.css';

export const wrap = style({
  borderBottom: `1px solid ${vars.colors.menuMobileItemBorder}`,
});

export const item = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    py: '5x',
    pr: '6x',
    pl: '2x',
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
    w: 'full',
  }),
  {
    selectors: {
      [`${wrap} &`]: {
        borderBottomWidth: '0',
      },
    },
  },
]);

const iconBase = sprinkles({
  color: 'menuMobileItemIcon',
  size: '6x',
  mr: '4x',
});

export const icon = styleVariants({
  base: [iconBase],
  active: [
    iconBase,
    sprinkles({
      color: 'menuMobileItemIconActive',
    }),
  ],
});

export const baseChevron = style({
  marginLeft: 'auto',
  transitionProperty: 'transform',
  transitionDuration: transitionDurationVars.base,
});

export const chevronUp = style({
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
  up: [baseChevron, chevronUp],
  right: [baseChevron, chevronRight],
  down: [baseChevron, chevronDown],
});
