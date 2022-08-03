import { style } from '@vanilla-extract/css';
import { sizeVars, vars } from 'web/src/theme/vars.css';

export const backdrop = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: vars.colors.chatErrorBackdrop,
});

export const modal = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const cross = style({
  position: 'absolute',
  top: sizeVars['2x'],
  right: sizeVars['2x'],
});
