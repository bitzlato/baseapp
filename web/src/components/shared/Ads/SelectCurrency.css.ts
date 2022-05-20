import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const input = style([
  {
    paddingLeft: '40px',
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

export const inputPrefix = style({
  position: 'absolute',
  top: '50%',
  left: '1px',
  marginLeft: '10px',
  transform: 'translateY(-50%)',
  zIndex: 2,
});
