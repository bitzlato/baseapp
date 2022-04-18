import { style } from '@vanilla-extract/css';

export const dropdown = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
  fontSize: 16,
  position: 'absolute',
  top: '84%',
  left: 0,
  opacity: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  pointerEvents: 'none',
  transform: 'translateY(-5%)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  width: 254,
  maxHeight: '80vh',
  zIndex: 99990,
});

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

export const dropdownMobile = style({
  top: 56 * 0.84,
  left: 8,

  selectors: {
    [`${dropdownRight}&`]: {
      left: 'auto',
      right: 8,
    },
  },
});
