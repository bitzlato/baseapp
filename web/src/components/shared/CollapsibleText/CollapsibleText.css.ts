import { style, styleVariants } from '@vanilla-extract/css';

import * as collapsibleBoxStyles from 'web/src/components/collapsibleBox/CollapsibleBox.css';

export const collapsed = style({
  maxHeight: '25px',
});

export const collapseTextContent = styleVariants({
  collapse: [collapsibleBoxStyles.base, collapsed],
  expand: [collapsibleBoxStyles.base, collapsibleBoxStyles.expand],
});

export const { chevrone } = collapsibleBoxStyles;
