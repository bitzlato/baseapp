import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const input = style([
  {
    paddingRight: '40px',
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
      '&[readonly], &:disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  sprinkles({
    textOverflow: 'ellipsis',
  }),
]);

export const inputRightControls = style({
  position: 'absolute',
  top: '50%',
  right: '1px',
  transform: 'translateY(-50%)',
});
