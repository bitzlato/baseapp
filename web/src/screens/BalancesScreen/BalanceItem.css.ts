import { style, styleVariants } from '@vanilla-extract/css';
import { sizeVars, vars } from 'web/src/theme/vars.css';

export const itemBase = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: sizeVars['4x'],
  paddingRight: sizeVars['5x'],
  borderLeft: '4px solid transparent',
  borderBottom: `1px solid ${vars.colors.walletItemBorderBottom}`,
});

export const item = styleVariants({
  base: [
    itemBase,
    {
      color: vars.colors.walletItemColor,

      selectors: {
        '&:hover': {
          backgroundColor: vars.colors.walletItemBackgroundHover,
          color: vars.colors.walletItemColorActive,
          textDecoration: 'none',
        },
      },
    },
  ],
  active: [
    itemBase,
    {
      backgroundColor: vars.colors.walletItemBackgroundActive,
      borderLeftColor: vars.colors.walletItemBorderLeftActive,
      borderBottom: `1px solid ${vars.colors.walletItemBorderBottom}`,
      color: vars.colors.walletItemColorActive,
    },
  ],
});
