import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const dropdown = style([
  {
    fontFamily: "'Montserrat', helvetica, sans-serif",
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: 0,
    opacity: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    pointerEvents: 'none',
    transform: 'translateY(-5%)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    width: 300,
    maxHeight: '80vh',
  },
  sprinkles({ zIndex: 'dropdown' }),
]);

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
  transform: 'translateY(0)',
});

export const dropdownRight = style({
  left: 'auto',
  right: 0,
});

export const dropdownSmall = style({
  width: 160,
});
