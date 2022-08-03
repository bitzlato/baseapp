import { style, styleVariants } from '@vanilla-extract/css';
import { sizeVars } from 'web/src/theme/vars.css';

export const topSpace = style({
  marginTop: sizeVars['4x'],
  selectors: {
    '&:first-child': {
      marginTop: 0,
    },
  },
});

const messageBase = style({
  display: 'inline-block',
  maxWidth: 300,
});

export const message = styleVariants({
  to: [
    messageBase,
    {
      borderTopLeftRadius: '0px',
      marginRight: sizeVars['4x'],
    },
  ],
  from: [
    messageBase,
    {
      borderTopRightRadius: '0px',
      marginLeft: sizeVars['4x'],
    },
  ],
});
