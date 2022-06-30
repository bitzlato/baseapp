import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const item = style([
  resetStyles.base,
  sprinkles({
    color: {
      default: 'dropdownItemText',
      hover: 'dropdownItemHoverText',
    },
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    h: '14x',
    px: '3x',
    borderBottomWidth: '1x',
    borderBottomStyle: 'solid',
    borderBottomColor: 'dropdownItemBorderBottom',
    textDecoration: {
      default: 'none',
      hover: 'none',
    },
    bg: {
      default: 'dropdownItem',
      hover: 'dropdownItemHover',
    },
    position: 'relative',
    width: 'full',
    flexShrink: 0,
    fontSize: 'medium',
    fontWeight: 'strong',
  }),
  {
    selectors: {
      '&:last-child': {
        borderBottomColor: 'transparent',
      },
    },
  },
]);

export const itemActive = style([
  resetStyles.base,
  sprinkles({
    color: { default: 'dropdownItemActiveText', hover: 'dropdownItemHoverText' },
  }),
]);

export const icon = style([
  sprinkles({
    color: 'dropdownItemIcon',
    size: '6x',
    mr: '4x',
  }),
  {
    selectors: {
      [`${item}:hover &`]: {
        color: vars.colors.dropdownItemHoverIcon,
      },
      [`${itemActive} &`]: {
        color: vars.colors.dropdownItemActiveIcon,
      },
    },
  },
]);

export const iconWithFill = style({
  fill: vars.colors.dropdown,
});
