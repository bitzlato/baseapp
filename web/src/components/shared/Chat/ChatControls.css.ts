import { style } from '@vanilla-extract/css';
import { fontFamilyVars, fontSizeVars, sizeVars, vars } from 'web/src/theme/vars.css';

export const textarea = style({
  border: 'none',
  width: '100%',
  resize: 'none',
  backgroundColor: 'transparent',
  fontFamily: fontFamilyVars.brand,
  fontSize: fontSizeVars.medium,
  color: vars.colors.text,
  margin: `${sizeVars['4x']} 0`,
  height: 24,
  outline: 'none',
});

export const sendText = style({
  padding: sizeVars['4x'],
  color: vars.colors.text,
  ':hover': {
    color: vars.colors.textHighlighted,
  },
});

export const sendFile = style([
  sendText,
  {
    position: 'relative',
    overflow: 'hidden',
  },
]);

export const sendFileInput = style({
  fontSize: 100,
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
});
