import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const fileSelectButton = style({
  textAlign: 'center',
  cursor: 'pointer',
});

export const errorMessage = style({
  color: vars.colors.alert,
  fontSize: '1.2rem',
  marginTop: '8px',
});
