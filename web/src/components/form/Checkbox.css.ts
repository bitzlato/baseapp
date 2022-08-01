import { style, styleVariants } from '@vanilla-extract/css';
import { sizeVars, transitionDurationVars, vars } from 'web/src/theme/vars.css';

export const checkbox = style({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  verticalAlign: 'top',
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
  borderWidth: 2,
  borderColor: 'inherit',
  color: vars.colors.radio,
  boxSizing: 'border-box',
  selectors: {
    [`${input}:focus + &`]: {
      boxShadow: `0px 0px 0px 4px ${vars.colors.radioShadow}`,
    },
  },
});

export const control = styleVariants({
  base: [controlBase],
  checked: [
    controlBase,
    {
      backgroundColor: vars.colors.radioChecked,
      borderColor: vars.colors.radioChecked,
      selectors: {
        [`${input}:focus + &`]: {
          boxShadow: `0px 0px 0px 4px ${vars.colors.radioShadowChecked}`,
        },
      },
    },
  ],
});
