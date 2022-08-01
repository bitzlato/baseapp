import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { sizeVars, vars } from 'web/src/theme/vars.css';

export const inputContainerBase = sprinkles({
  position: 'relative',
  display: 'flex',
  fontSize: 'medium',
  lineHeight: 'medium',
});

const inputContainerSizes = {
  small: sizeVars['9x'],
  medium: sizeVars['12x'],
};

export const inputContainer = styleVariants(inputContainerSizes, (size) => [
  inputContainerBase,
  { minHeight: size },
]);

export type InputContainerSizes = keyof typeof inputContainer;

export const inputBase = style([
  sprinkles({
    display: 'block',
    width: 'full',
    height: 'auto',
    borderStyle: 'solid',
    borderColor: 'inputBorder',
    borderWidth: '1x',
    borderRadius: '1.5x',
    backgroundColor: 'transparent',
    color: 'text',
    fontFamily: 'brand',
  }),
  {
    outlineOffset: '-1px',
    '::placeholder': { color: vars.colors.inputPlaceholder },
    selectors: {
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    },
  },
]);

export const input = styleVariants({
  small: [
    inputBase,
    {
      paddingLeft: sizeVars['2x'],
      paddingRight: sizeVars['2x'],
    },
  ],
  medium: [
    inputBase,
    {
      paddingLeft: sizeVars['4x'],
      paddingRight: sizeVars['4x'],
    },
  ],
});

export const inputError = style({
  borderColor: vars.colors.danger,
});

export const inputWithLabel = styleVariants({
  small: {
    paddingTop: sizeVars['4x'],
  },
  medium: {
    paddingTop: sizeVars['3x'],
  },
});

export const label = style([
  sprinkles({
    position: 'absolute',
    width: 'full',
    pt: '1x',
    px: '4x',
    fontSize: 'caption',
    lineHeight: 'small',
    color: 'inputPlaceholder',
    textOverflow: 'ellipsis',
  }),
  {
    transition: 'all .2s ease',
  },
]);

export const icon = style([
  sprinkles({
    position: 'absolute',
    color: 'inputPlaceholder',
    right: '12px',
    top: 0,
  }),
  {
    transition: 'all .2s ease',
  },
]);

export const showIcon = style([
  sprinkles({
    pr: '16x',
  }),
]);

globalStyle(`${input.small}:not(:focus):placeholder-shown + ${label}`, {
  fontSize: '100%',
  lineHeight: sizeVars['9x'],
});

globalStyle(`${input.medium}:not(:focus):placeholder-shown + ${label}`, {
  fontSize: '100%',
  paddingTop: 2,
  lineHeight: sizeVars['11x'],
});
