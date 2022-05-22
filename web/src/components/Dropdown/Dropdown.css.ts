import { style } from '@vanilla-extract/css';

export const chevron = style({
  transition: 'transform 0.3s ease',
});

export const chevronOpened = style({
  transform: 'rotate(-180deg)',
});

export const dropdown = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  opacity: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  pointerEvents: 'none',
  transform: 'translateY(-5%)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  width: '100%',
  maxHeight: '284px',
  zIndex: 10000,
});

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
  transform: 'translateY(0)',
});
