import { style, styleVariants } from '@vanilla-extract/css';
import { fontSizeVars, radiiVars, sizeVars, vars } from 'web/src/theme/vars.css';

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

const controlBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  fontWeight: 'bold',
  fontSize: fontSizeVars.medium,
  paddingLeft: sizeVars['4x'],
  paddingRight: sizeVars['4x'],
  height: '100%',
  cursor: 'pointer',
  selectors: {
    '&:first-child': {
      borderTopLeftRadius: radiiVars['1.5x'],
      borderBottomLeftRadius: radiiVars['1.5x'],
    },
    '&:last-child': {
      borderTopRightRadius: radiiVars['1.5x'],
      borderBottomRightRadius: radiiVars['1.5x'],
    },
  },
});

export const control = styleVariants({
  base: [
    controlBase,
    {
      color: vars.colors.text,
      selectors: {
        '&:hover': {
          color: vars.colors.textHighlighted,
        },
      },
    },
  ],
  active: [
    controlBase,
    {
      color: vars.colors.variantSwitcherItemTextActive,
      backgroundColor: vars.colors.variantSwitcherItemBgActive,
    },
  ],
});

export const controlFocused = style({
  boxShadow: vars.boxShadows.control,
});
