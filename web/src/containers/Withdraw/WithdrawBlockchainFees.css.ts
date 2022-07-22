import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { radiiVars, sizeVars, vars } from 'web/src/theme/vars.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const fees = style([
  {
    display: 'grid',
    gap: 24,
  },
  responsiveStyle({
    tablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    desktop: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  }),
]);

const itemBase = style({
  borderRadius: radiiVars['1x'],
  cursor: 'pointer',
});

export const item = styleVariants({
  base: [
    itemBase,
    {
      backgroundColor: vars.colors.withdrawBlockchainFeeBackground,
      selectors: {
        '&:hover': {
          backgroundColor: vars.colors.withdrawBlockchainFeeBackgroundHover,
        },
      },
    },
  ],
  active: [
    itemBase,
    {
      backgroundColor: vars.colors.withdrawBlockchainFeeBackgroundActive,
    },
  ],
});

// TODO: need refactoring components/ui/Radio for easy styling
globalStyle(`${itemBase} > label`, {
  padding: sizeVars['3x'],
  marginBottom: 0,
  display: 'flex',
});

globalStyle(`${itemBase} > label > span:nth-child(3)`, {
  flex: 1,
});
