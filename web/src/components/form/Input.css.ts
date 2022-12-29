import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';

export const input = recipe({
  base: [
    sprinkles({
      display: 'block',
      width: 'full',
      height: '11x',
      borderStyle: 'solid',
      borderWidth: '1x',
      borderRadius: '1.5x',
      bg: 'transparent',
      color: 'text',
      fontFamily: 'brand',
      fontSize: 'medium',
      lineHeight: 'medium',
      px: '4x',
    }),
    {
      fontVariantNumeric: 'tabular-nums',
      outline: 'none',
      '::placeholder': { color: vars.colors.inputPlaceholder },
      selectors: {
        '&:focus': {
          borderColor: vars.colors.inputBorderFocus,
          boxShadow: `${vars.colors.inputBorderFocus} 0px 0px 0px 1px`,
        },
        '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
          caretColor: vars.colors.text,
          transition: 'background-color 5000s ease-in-out 0s',
        },
        '&[disabled]': {
          cursor: 'not-allowed',
        },
      },
    },
  ],

  variants: {
    isInvalid: {
      true: {
        borderColor: vars.colors.danger,
      },
      false: {
        borderColor: vars.colors.inputBorder,
      },
    },
  },

  defaultVariants: {
    isInvalid: false,
  },
});
