import { style } from '@vanilla-extract/css';

export const input = style({
  border: 'none',
  background: 'none',
  padding: 0,
  width: '100%',

  selectors: {
    'textarea.&': {
      height: 80,
    },
  },
});
