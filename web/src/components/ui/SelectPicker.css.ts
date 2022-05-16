import { style } from '@vanilla-extract/css';

export const outerOverlay = style({
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  position: 'fixed',
  zIndex: 1,
});

export const control = style({
  cursor: 'pointer',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const label = style({});

export const value = style({});

export const chevron = style({});

export const chevronRotated = style({
  transform: 'rotate(180deg)',
  transformOrigin: 'center',
});

export const dropdown = style({
  backgroundColor: 'white',
  borderRadius: 6,
  position: 'absolute',
  zIndex: 'calc(var(--z-index-dropdown) + 2)',
  width: '100%',
  height: 280,
  fontSize: '15px',
  overflow: 'hidden',
  boxShadow: '5px 4px 13px 0 rgba(0, 0, 0, 0.15)',
});

export const searchIcon = style({
  fill: 'rgba(38, 45, 55, 0.3)',
  width: 30,
  height: 20,
});
