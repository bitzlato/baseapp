import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';
import { item as dropdownItem } from 'web/src/components/shared/Header/Dropdown/DropdownItem.css';

export const item = style([
  dropdownItem,
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
  }),
]);

export const themeSwitcher = style({});

export const sun = style({
  display: 'block',
  color: vars.colors.themeSwitcherSun,
  selectors: {
    [`${themeSwitcher}:hover &`]: {
      color: vars.colors.themeSwitcherSunHover,
    },
  },
});

export const moon = style({
  display: 'block',
  color: vars.colors.themeSwitcherMoon,
});
