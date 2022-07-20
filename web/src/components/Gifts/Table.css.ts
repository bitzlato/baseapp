import { style, styleVariants } from '@vanilla-extract/css';
import { sizeVars } from 'web/src/theme/vars.css';

const headerSizes = {
  small: {
    paddingTop: sizeVars['2x'],
    paddingBottom: sizeVars['2x'],
  },
  medium: {
    paddingTop: sizeVars['5x'],
    paddingBottom: sizeVars['6x'],
  },
};

const headerBase = style({});

export const header = styleVariants(headerSizes, (sizeStyles) => [headerBase, sizeStyles]);

export type HeaderSizes = keyof typeof header;
