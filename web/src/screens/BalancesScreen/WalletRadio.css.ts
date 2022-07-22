import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import {
  fontSizeVars,
  radiiVars,
  sizeVars,
  transitionDurationVars,
  vars,
} from 'web/src/theme/vars.css';

export const radio = style({
  display: 'block',
  cursor: 'pointer',
  width: '100%',
});

export const input = style({
  border: '0px none',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute',
});

export const controlBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: sizeVars['4x'],
  height: sizeVars['4x'],
  transitionProperty: 'box-shadow',
  transitionDuration: transitionDurationVars.base,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 9999,
  borderColor: vars.colors.walletRadioControlBorderColor,
  selectors: {
    [`${input}:focus + &`]: {
      boxShadow: `0px 0px 0px 4px ${vars.colors.walletRadioShadow}`,
    },
  },
});

export const control = styleVariants({
  base: [controlBase],
  checked: [
    controlBase,
    {
      backgroundColor: vars.colors.walletRadioColorBackgroundChecked,
      borderColor: vars.colors.walletRadioControlBorderColorChecked,
      borderWidth: 4,
      selectors: {
        [`${input}:focus + &`]: {
          boxShadow: `0px 0px 0px 4px ${vars.colors.walletRadioShadowChecked}`,
        },
      },
    },
  ],
});

export const item = recipe({
  base: {
    display: 'block',
    borderRadius: radiiVars['1.5x'],
  },

  variants: {
    size: {
      medium: {
        paddingLeft: sizeVars['4x'],
        paddingTop: sizeVars['6x'],
        paddingRight: sizeVars['4x'],
        paddingBottom: sizeVars['6x'],
      },
      large: {
        padding: sizeVars['5x'],
      },
    },
    checked: {
      true: {
        backgroundColor: vars.colors.walletRadioItemBackgroundChecked,
        color: vars.colors.walletRadioItemColorChecked,
      },
      false: {},
    },
    disabled: {
      true: {
        backgroundColor: vars.colors.walletRadioItemBackgroundDisabled,
        color: vars.colors.walletRadioItemColorDisabled,
        cursor: 'not-allowed',
      },
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        checked: false,
        disabled: false,
      },

      style: {
        backgroundColor: vars.colors.walletRadioItemBackground,
        color: vars.colors.walletRadioItemColor,

        selectors: {
          '&:hover': {
            backgroundColor: vars.colors.walletRadioItemBackgroundHover,
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: 'medium',
    checked: false,
    disabled: false,
  },
});

const childrenBase = style({
  display: 'block',
  marginTop: sizeVars['1x'],
  paddingLeft: sizeVars['6x'],
});

export const children = styleVariants({
  medium: [
    childrenBase,
    {
      fontSize: fontSizeVars.medium,
    },
  ],
  large: [
    childrenBase,
    {
      fontSize: fontSizeVars.lead24,
      fontWeight: 'bold',
    },
  ],
});
