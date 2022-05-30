import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const unread = style([
  sprinkles({
    px: '2x',
    py: '1x',
    fontWeight: 'strong',
    fontSize: 'small',
    backgroundColor: 'danger',
    color: 'tooltipText',
  }),
  {
    position: 'absolute',
    top: '-12px',
    right: '24px',
    height: '24px',
    lineHeight: 1.2,
    borderRadius: '22px',
    transform: 'translateX(100%)',
    zIndex: 10000,
  },
]);

export const items = style({
  overflowY: 'auto',
  padding: '0 16px',
});
