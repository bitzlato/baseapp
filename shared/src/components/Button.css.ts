import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from 'shared/src/theme/sprinkles.css';

export const button = recipe({
  base: sprinkles({
    display: 'inline-block',
    fontWeight: '600',
  }),

  variants: {
    color: {
      primary: sprinkles({
        bg: {
          default: 'btnPrimaryBg',
          hover: 'btnPrimaryBgHover',
          active: 'btnPrimaryBgActive',
        },
        boxShadow: {
          focusVisible: 'btnPrimaryFocus',
        },
        color: 'btnPrimaryText',
      }),
      secondary: sprinkles({
        bg: {
          default: 'btnSecondaryBg',
          hover: 'btnSecondaryBgHover',
          active: 'btnSecondaryBgActive',
        },
        boxShadow: {
          focusVisible: 'btnSecondaryFocus',
        },
        color: 'btnSecondaryText',
      }),
    },
    size: {
      small: sprinkles({
        fontSize: 'small',
        lineHeight: 'small',
        px: '2x',
        py: '1.5x',
        borderRadius: '1x',
      }),
      medium: sprinkles({
        fontSize: 'medium',
        lineHeight: 'medium',
        px: '4x',
        py: '2x',
        borderRadius: '1x',
      }),
      large: sprinkles({
        fontSize: 'large',
        lineHeight: 'medium',
        px: '8x',
        py: '4x',
        borderRadius: '2x',
      }),
    },
    disabled: {
      true: {},
    },
    fullWidth: {
      true: sprinkles({
        w: 'full',
      }),
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'primary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
      }),
    },
    {
      variants: {
        color: 'secondary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
      }),
    },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
