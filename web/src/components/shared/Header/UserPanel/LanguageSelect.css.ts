import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const language = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    w: '11x',
    h: '6x',
    borderWidth: '1x',
    borderStyle: 'solid',
    borderRadius: '1.5x',
    fontSize: 'small',
    fontWeight: 'strong',
    textTransform: 'uppercase',
    textAlign: 'center',
    cursor: 'pointer',
    color: 'text',
  }),
  {
    userSelect: 'none',
  },
]);
