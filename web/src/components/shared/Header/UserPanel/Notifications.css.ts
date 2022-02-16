import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const unread = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: vars.colors.alert,
      width: 8,
      height: 8,
      borderRadius: '50%',
    },
  },
});

export const items = style({
  overflowY: 'auto',
});
