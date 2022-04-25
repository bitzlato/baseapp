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
      selectors: {
        'a&': {
          textDecoration: 'none',
        },
      },
    },
  ],

  variants: {
    variant: {
      contained: '',
      outlined: sprinkles({
        borderWidth: '1x',
        borderStyle: 'solid',
      }),
      text: '',
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
      clarified: {
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
    active: {
      true: '',
      false: '',
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
    // PRIMARY + CONTAINED
    {
      variants: {
        variant: 'contained',
        color: 'primary',
        disabled: false,
        active: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'btnPrimaryBg',
            hover: 'btnPrimaryBgHover',
          },
          color: {
            default: 'btnPrimaryText',
            hover: 'btnPrimaryText',
          },
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
        active: true,
      },

      style: sprinkles({
        bg: 'btnPrimaryBgActive',
        color: {
          default: 'btnPrimaryText',
          hover: 'btnPrimaryText',
        },
      }),
    },

    {
      variants: {
        variant: 'contained',
        color: 'primary',
        disabled: true,
        active: false,
      },

      style: sprinkles({
        bg: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // PRIMARY + OUTLINED
    {
      variants: {
        variant: 'outlined',
        color: 'primary',
        active: false,
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
        active: true,
      },

      style: sprinkles({
        borderColor: 'btnPrimaryBgActive',
        color: {
          default: 'btnPrimaryBgActive',
          hover: 'btnPrimaryBgActive',
        },
      }),
    },

    {
      variants: {
        variant: 'outlined',
        color: 'primary',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        borderColor: 'btnPrimaryBgDisabled',
        color: 'btnPrimaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // PRIMARY + TEXT
    {
      variants: {
        variant: 'text',
        color: 'primary',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'transparent',
            hover: 'btnPrimaryBg10',
          },
          color: {
            default: 'btnPrimaryBg',
            hover: 'btnPrimaryBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnPrimaryBg20,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'text',
        color: 'primary',
        active: true,
      },

      style: sprinkles({
        bg: 'btnPrimaryBg20',
        color: {
          default: 'btnPrimaryBg',
          hover: 'btnPrimaryBgHover',
        },
      }),
    },

    {
      variants: {
        variant: 'text',
        color: 'primary',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        color: 'btnPrimaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // SECONDARY + CONTAINED
    {
      variants: {
        variant: 'contained',
        color: 'secondary',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'btnSecondaryBg',
            hover: 'btnSecondaryBgHover',
          },
          color: {
            default: 'btnSecondaryText',
            hover: 'btnSecondaryText',
          },
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
        active: true,
      },

      style: sprinkles({
        bg: 'btnSecondaryBgActive',
        color: {
          default: 'btnSecondaryText',
          hover: 'btnSecondaryText',
        },
      }),
    },

    {
      variants: {
        variant: 'contained',
        color: 'secondary',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        bg: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // SECONDARY + OUTLINED
    {
      variants: {
        variant: 'outlined',
        color: 'secondary',
        active: false,
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
        active: true,
      },

      style: sprinkles({
        borderColor: 'btnSecondaryBgActive',
        color: {
          default: 'btnSecondaryBgActive',
          hover: 'btnSecondaryBgActive',
        },
      }),
    },

    {
      variants: {
        variant: 'outlined',
        color: 'secondary',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        borderColor: 'btnSecondaryBgDisabled',
        color: 'btnSecondaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // SECONDARY + TEXT
    {
      variants: {
        variant: 'text',
        color: 'secondary',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'transparent',
            hover: 'btnSecondaryBg10',
          },
          color: {
            default: 'btnSecondaryBg',
            hover: 'btnSecondaryBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnSecondaryBg20,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'text',
        color: 'secondary',
        active: true,
      },

      style: sprinkles({
        bg: 'btnSecondaryBg20',
        color: {
          default: 'btnSecondaryBg',
          hover: 'btnSecondaryBgHover',
        },
      }),
    },

    {
      variants: {
        variant: 'text',
        color: 'secondary',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        color: 'btnSecondaryTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // DANGER + CONTAINED
    {
      variants: {
        variant: 'contained',
        color: 'danger',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'btnDangerBg',
            hover: 'btnDangerBgHover',
          },
          color: {
            default: 'btnDangerText',
            hover: 'btnDangerText',
          },
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
        active: true,
      },

      style: sprinkles({
        bg: 'btnDangerBgActive',
        color: {
          default: 'btnDangerText',
          hover: 'btnDangerText',
        },
      }),
    },

    {
      variants: {
        variant: 'contained',
        color: 'danger',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        bg: 'btnDangerBgDisabled',
        color: 'btnDangerTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // DANGER + OUTLINED
    {
      variants: {
        variant: 'outlined',
        color: 'danger',
        active: false,
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
        active: true,
      },

      style: sprinkles({
        borderColor: 'btnDangerBgActive',
        color: {
          default: 'btnDangerBgActive',
          hover: 'btnDangerBgActive',
        },
      }),
    },

    {
      variants: {
        variant: 'outlined',
        color: 'danger',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        borderColor: 'btnDangerBgDisabled',
        color: 'btnDangerTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // DANGER + TEXT
    {
      variants: {
        variant: 'text',
        color: 'danger',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'transparent',
            hover: 'btnDangerBg10',
          },
          color: {
            default: 'btnDangerBg',
            hover: 'btnDangerBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnDangerBg20,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'text',
        color: 'danger',
        active: true,
      },

      style: sprinkles({
        bg: 'btnDangerBg20',
        color: {
          default: 'btnDangerBg',
          hover: 'btnDangerBgHover',
        },
      }),
    },

    {
      variants: {
        variant: 'text',
        color: 'danger',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        color: 'btnDangerTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // CLARIFIED  + CONTAINED
    {
      variants: {
        variant: 'contained',
        color: 'clarified',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'btnClarifiedBg',
            hover: 'btnClarifiedBgHover',
          },
          color: {
            default: 'btnClarifiedText',
            hover: 'btnClarifiedText',
          },
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnClarifiedBgActive,
              color: vars.colors.btnClarifiedTextActive,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'contained',
        color: 'clarified',
        active: true,
      },

      style: sprinkles({
        bg: 'btnClarifiedBgActive',
        color: {
          default: 'btnClarifiedTextActive',
          hover: 'btnClarifiedTextActive',
        },
      }),
    },

    {
      variants: {
        variant: 'contained',
        color: 'clarified',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        bg: 'btnClarifiedBgDisabled',
        color: 'btnClarifiedTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // CLARIFIED + OUTLINED
    {
      variants: {
        variant: 'outlined',
        color: 'clarified',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          borderColor: {
            default: 'btnClarifiedBg',
            hover: 'btnClarifiedBgHover',
          },
          color: {
            default: 'btnClarifiedBg',
            hover: 'btnClarifiedBgHover',
          },
        }),
        {
          selectors: {
            '&:active': {
              borderColor: vars.colors.btnClarifiedBgActive,
              color: vars.colors.btnClarifiedBgActive,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'outlined',
        color: 'clarified',
        active: true,
      },

      style: sprinkles({
        borderColor: 'btnClarifiedBgActive',
        color: {
          default: 'btnClarifiedBgActive',
          hover: 'btnClarifiedBgActive',
        },
      }),
    },

    {
      variants: {
        variant: 'outlined',
        color: 'clarified',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        borderColor: 'btnClarifiedBgDisabled',
        color: 'btnClarifiedTextDisabled',
        cursor: 'not-allowed',
      }),
    },

    // CLARIFIED + TEXT
    {
      variants: {
        variant: 'text',
        color: 'clarified',
        active: false,
        disabled: false,
      },

      style: [
        sprinkles({
          bg: {
            default: 'transparent',
            hover: 'btnClarifiedBg',
          },
          color: {
            default: 'btnClarifiedText',
            hover: 'btnClarifiedText',
          },
        }),
        {
          selectors: {
            '&:active': {
              backgroundColor: vars.colors.btnClarifiedBg,
            },
          },
        },
      ],
    },

    {
      variants: {
        variant: 'text',
        color: 'clarified',
        active: true,
      },

      style: sprinkles({
        bg: 'btnClarifiedBg',
        color: {
          default: 'btnClarifiedText',
          hover: 'btnClarifiedText',
        },
      }),
    },

    {
      variants: {
        variant: 'text',
        color: 'clarified',
        active: false,
        disabled: true,
      },

      style: sprinkles({
        color: 'btnClarifiedTextDisabled',
        cursor: 'not-allowed',
      }),
    },
  ],

  defaultVariants: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    active: false,
    disabled: false,
    fullWidth: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
