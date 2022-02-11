import { style } from '@vanilla-extract/css';
import { sprinkles } from 'shared/src/theme/sprinkles.css';
import * as resetStyles from 'shared/src/theme/reset.css';

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
    h: '9x',
    pr: '5x',
    pl: '9x',
  }),
  {
    position: 'relative',
    width: '100%',
    selectors: {
      '&:last-child': {
        borderBottomColor: 'transparent',
      },
    },
  },
]);

export const itemActive = style([
  sprinkles({
    color: 'dropdownItemActiveText',
    bg: 'dropdownItemHover',
    fontWeight: 'strong',
  }),
]);
