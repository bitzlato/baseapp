import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sizeVars, vars } from 'web/src/theme/vars.css';

export const button = recipe({
  base: {
    border: `solid 1px ${vars.colors.traderBorder}`,
    width: sizeVars['9x'],
    height: sizeVars['9x'],
    marginLeft: '8px',
    selectors: {
      '&:hover': {
        backgroundColor: vars.colors.traderBgHover,
      },
    },
  },

  variants: {
    variant: {
      block: {
        color: vars.colors.traderBlocked,
      },
      trust: {},
    },
    active: {
      true: '',
    },
  },

  compoundVariants: [
    {
      variants: {
        variant: 'block',
        active: true,
      },

      style: {
        backgroundColor: vars.colors.traderBlocked,
        color: vars.colors.traderIconActive,
        selectors: {
          '&:hover': {
            backgroundColor: vars.colors.traderBlockedBgHover,
          },
        },
      },
    },
    {
      variants: {
        variant: 'trust',
        active: true,
      },

      style: {
        backgroundColor: vars.colors.traderFavorited,
        color: vars.colors.traderIconActive,
        selectors: {
          '&:hover': {
            backgroundColor: vars.colors.traderFavoritedBgHover,
          },
        },
      },
    },
  ],
});

export type ButtonVariants = RecipeVariants<typeof button>;
