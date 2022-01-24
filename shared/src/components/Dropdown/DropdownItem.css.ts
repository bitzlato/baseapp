import { style } from '@vanilla-extract/css';
import { sprinkles } from 'theme/sprinkles.css';
import { vars } from 'theme/vars.css';
import * as resetStyles from 'theme/reset.css';

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
    px: '5x',
    borderBottomWidth: '2x',
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
    color: 'dropdownItemActiveText',
    bg: 'dropdownItemHover',
  }),
  {
    selectors: {
      '&::before': {
        backgroundColor: vars.colors.dropdownItemActiveBefore,
        content: '',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: 3,
      },
    },
  },
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
