import { style } from '@vanilla-extract/css';
import { radiiVars, sizeVars } from 'web/src/theme/vars.css';

export const avatar = style({
  height: sizeVars['9x'],
  width: sizeVars['9x'],
  objectFit: 'cover',
  borderRadius: radiiVars.circle,
});
