import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const tabLink = style([
  resetStyles.base,
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'full',
    color: 'bottomTabsText',
    textDecoration: { default: 'none', hover: 'none' },
    cursor: 'pointer',
  }),
]);

export const tabLinkActive = sprinkles({
  color: 'bottomTabsTextActive',
});

export const tabTitle = style([
  sprinkles({
    mt: '2x',
  }),
  {
    fontSize: 10,
    selectors: {
      [`${tabLink}:hover &`]: {
        color: vars.colors.bottomTabsIconActive,
      },
    },
  },
]);

export const tabIcon = style([
  sprinkles({
    color: 'bottomTabsIcon',
  }),
  {
    selectors: {
      [`${tabLink}:hover &`]: {
        color: vars.colors.bottomTabsIconActive,
      },
      [`${tabLinkActive} &`]: {
        color: vars.colors.bottomTabsIconActive,
      },
    },
  },
]);
