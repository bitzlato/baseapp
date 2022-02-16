import { keyframes, style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loader = style({
  borderRadius: '50%',
  width: 32,
  height: 32,
  margin: '60px auto',
  fontSize: 10,
  position: 'relative',
  textIndent: '-9999em',
  borderTop: `4px solid ${vars.colors.spinner01}`,
  borderRight: `4px solid ${vars.colors.spinner01}`,
  borderBottom: `4px solid ${vars.colors.spinner01}`,
  borderLeft: `4px solid ${vars.colors.spinner02}`,
  transform: 'translateZ(0)',
  animation: `${rotate} 1.1s infinite linear`,
});
