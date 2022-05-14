import { style } from '@vanilla-extract/css';

export const outerOverlay = style({
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  position: 'fixed',
  zIndex: 1,
});

export const dropdown = style({
  backgroundColor: 'white',
  borderRadius: 4,
  marginTop: 8,
  position: 'absolute',
  zIndex: 2,
  width: '100%',
});

export const control = style({
  display: 'flex',
})
