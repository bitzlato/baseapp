import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';

export const button = recipe({
  base: [
    sprinkles({
      fontFamily: 'brand',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'strong',
      lineHeight: 'base',
    }),
    {
      minWidth: 'auto',
    },
  ],

  variants: {
    variant: {
      contained: '',
      outlined: sprinkles({
        borderWidth: '1x',
        borderStyle: 'solid',
      }),
    },
    color: {
      primary: {
        selectors: {
          '&:focus': {
            boxShadow: vars.boxShadows.btnPrimaryFocus,
          },
        },
      },
      secondary: {
        selectors: {
          '&:focus': {
            boxShadow: vars.boxShadows.btnSecondaryFocus,
          },
        },
      },
      danger: {
        selectors: {
          '&:focus': {
            boxShadow: vars.boxShadows.btnSecondaryFocus,
          },
        },
      },
    },
    size: {
      small: sprinkles({
        fontSize: 'medium',
        minHeight: '9x',
        px: '4x',
        borderRadius: '1x',
      }),
      medium: sprinkles({
        fontSize: 'medium',
        minHeight: '11x',
        px: '4x',
        borderRadius: '1x',
      }),
      large: sprinkles({
        fontSize: 'large',
        minHeight: '12x',
        px: '8x',
        borderRadius: '2x',
      }),
    },
    disabled: {
      true: '',
      false: '',
    },
    fullWidth: {
      true: sprinkles({
        w: 'full',
      }),
      false: '',
    },
  },

  compoundVariants: [
    {
      variants: {
        variant: 'contained',
        color: 'primary',
        disabled: false,
      },
      style: [
        sprinkles({
          bg: {
            default: 'btnPrimaryBg',
            hover: 'btnPrimaryBgHover',
          },
          color: 'btnPrimaryText',
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnPrimaryBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'contained',
        color: 'primary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },
    {
      variants: {
        variant: 'outlined',
        color: 'primary',
        disabled: false,
      },
      style: [
        sprinkles({
          borderColor: {
            default: 'btnPrimaryBg',
            hover: 'btnPrimaryBgHover',
          },
          color: {
            default: 'btnPrimaryBg',
            hover: 'btnPrimaryBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              borderColor: vars.colors.btnPrimaryBgActive,
              color: vars.colors.btnPrimaryBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'outlined',
        color: 'primary',
        disabled: true,
      },
      style: sprinkles({
        borderColor: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },
    {
      variants: {
        variant: 'contained',
        color: 'secondary',
        disabled: false,
      },
      style: [
        sprinkles({
          bg: {
            default: 'btnSecondaryBg',
            hover: 'btnSecondaryBgHover',
          },
          color: 'btnSecondaryText',
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnSecondaryBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'contained',
        color: 'secondary',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },
    {
      variants: {
        variant: 'outlined',
        color: 'secondary',
        disabled: false,
      },
      style: [
        sprinkles({
          borderColor: {
            default: 'btnSecondaryBg',
            hover: 'btnSecondaryBgHover',
          },
          color: {
            default: 'btnSecondaryBg',
            hover: 'btnSecondaryBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              borderColor: vars.colors.btnSecondaryBgActive,
              color: vars.colors.btnSecondaryBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'outlined',
        color: 'secondary',
        disabled: true,
      },
      style: sprinkles({
        borderColor: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },
    {
      variants: {
        variant: 'contained',
        color: 'danger',
        disabled: false,
      },
      style: [
        sprinkles({
          bg: {
            default: 'btnDangerBg',
            hover: 'btnDangerBgHover',
          },
          color: 'btnDangerText',
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnDangerBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'contained',
        color: 'danger',
        disabled: true,
      },
      style: sprinkles({
        bg: 'btnDangerBgDisabled',
        color: 'btnDangerTextDisabled',
        cursor: 'not-allowed',
      }),
    },
    {
      variants: {
        variant: 'outlined',
        color: 'danger',
        disabled: false,
      },
      style: [
        sprinkles({
          borderColor: {
            default: 'btnDangerBg',
            hover: 'btnDangerBgHover',
          },
          color: {
            default: 'btnDangerBg',
            hover: 'btnDangerBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              borderColor: vars.colors.btnDangerBgActive,
              color: vars.colors.btnDangerBgActive,
            },
          },
        },
      ],
    },
    {
      variants: {
        variant: 'outlined',
        color: 'danger',
        disabled: true,
      },
      style: sprinkles({
        borderColor: 'btnDangerBgDisabled',
        color: 'btnDangerTextDisabled',
        cursor: 'not-allowed',
      }),
    },
  ],

  defaultVariants: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
