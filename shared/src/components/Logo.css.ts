import { style } from '@vanilla-extract/css';
import { vars } from 'theme/vars.css';

export const logo = style({
  display: 'block',
  height: '100%',
  width: 'auto',
  objectFit: 'contain',
  maxHeight: 60,
  maxWidth: 120,
});

export const beta = style({
  color: vars.colors.beta,
  left: 42,
  position: 'absolute',
  top: 34,
  width: 26,
});

export const svg = style({
  display: 'block',
});
