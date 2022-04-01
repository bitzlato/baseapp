import { style } from '@vanilla-extract/css';

export const avatarBox = style({
  height: '120px',
  width: '120px',
  minWidth: '120px',
  overflow: 'hidden',
  position: 'relative',
});

export const avatarSpinner = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-16px 0 0 -16px',
});

export const avatarImage = style({
  height: '120px',
  width: '120px',
  objectFit: 'cover',
});
