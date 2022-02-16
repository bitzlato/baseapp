import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

const hamburgerPadding = 16;
const hamburgerItemSize = 18;
export const hamburger = style({
  display: 'block',
  paddingLeft: hamburgerPadding,
  paddingRight: hamburgerPadding,
  marginLeft: -hamburgerPadding,
});

export const hamburgerItem = style({
  display: 'block',
  backgroundColor: vars.colors.interactive,
  width: hamburgerItemSize,
  height: 2,
  marginBottom: 5,
  transition: 'background 0.3s ease-in-out, transform 0.3s ease-in-out',

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const item2 = style({
  background: 'transparent',
});

export const item1 = style({
  transform: 'rotateZ(45deg) scaleX(1.25) translate(4px, 4px)',
});

export const item3 = style({
  transform: 'rotateZ(-45deg) scaleX(1.25) translate(5px, -5px)',
});
