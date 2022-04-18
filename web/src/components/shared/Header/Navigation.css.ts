import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const item = style([
  sprinkles({
    color: {
      default: 'text',
      hover: 'textHighlighted',
    },
    textDecoration: {
      default: 'none',
      hover: 'underline',
    },
    cursor: 'pointer',
    display: 'flex',
    height: 'full',
    alignItems: 'center',
  }),
  { fontSize: 16 },
]);

export const itemActive = sprinkles({
  color: 'textHighlighted',
});
