import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const container = style({
  position: 'relative',
  width: '100%',
  maxWidth: 180,
});

export const button = style({
  position: 'relative',
  width: '100%',
  zIndex: 2,
});

export const text = style({});

globalStyle(`${button}:hover svg`, {
  color: vars.colors.userAdButtonLinkHoverText,
});

globalStyle(`${button}:hover ${text}`, {
  color: vars.colors.userAdButtonLinkHoverText,
});

export const alert = style({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translate(-50%, -120%)',
  minWidth: 150,
});
