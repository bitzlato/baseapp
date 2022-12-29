import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { radiiVars, sizeVars, vars } from 'web/src/theme/vars.css';

export const controlsWithAddon = recipe({
  base: {
    background: vars.colors.block,
    display: 'flex',
    alignItems: 'center',
    height: sizeVars['11x'],
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: radiiVars['1.5x'],
    fontVariantNumeric: 'tabular-nums',
  },

  variants: {
    isInvalid: {
      true: {
        borderColor: vars.colors.danger,
      },
      false: {
        borderColor: vars.colors.inputBorder,
      },
    },

    isFocused: {
      true: {
        borderColor: vars.colors.inputBorderFocus,
        boxShadow: `${vars.colors.inputBorderFocus} 0px 0px 0px 1px`,
      },
      false: {},
    },
  },

  defaultVariants: {
    isInvalid: false,
    isFocused: false,
  },
});

export const input = style([
  sprinkles({
    width: 'full',
    height: 'full',
    bg: 'block',
    color: 'text',
    fontFamily: 'brand',
    fontSize: 'medium',
    lineHeight: 'medium',
    mx: '4x',
  }),
  {
    outline: 'none',
    '::placeholder': { color: vars.colors.inputPlaceholder },
    selectors: {
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
        caretColor: vars.colors.text,
        transition: 'background-color 5000s ease-in-out 0s',
      },
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    },
  },
]);
