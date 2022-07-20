import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const input = style([
  {
    paddingRight: '85px',
    backgroundColor: 'transparent !important',
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

export const inputRightControlsButton = style({
  selectors: {
    '&:hover': {
      opacity: 0.75,
    },
  },
});
