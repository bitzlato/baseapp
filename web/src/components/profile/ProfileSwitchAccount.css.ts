import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const account = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    px: '3x',
    py: '2x',
    borderBottomWidth: '1x',
    borderBottomStyle: 'solid',
    borderBottomColor: 'dropdownItemBorderBottom',
    color: {
      default: 'dropdownItemText',
      hover: 'dropdownItemHoverText',
    },
    bg: {
      default: 'dropdownItem',
      hover: 'dropdown',
    },
  }),
  {
    selectors: {
      '&:last-child': {
        borderBottomWidth: 0,
      },
    },
  },
]);

export const triangle = style({
  borderBottom: '0',
  borderLeft: '.3em solid transparent',
  borderRight: '.3em solid transparent',
  borderTop: '.3em solid',
  display: 'inline-block',
  marginLeft: '.255em',
  verticalAlign: '.255em',
  transition: 'transform 0.3s ease',
});

export const triangleOpened = style({
  transform: 'rotate(-180deg)',
});

export const dropdown = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
  position: 'absolute',
  top: '100%',
  left: 0,
  opacity: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  pointerEvents: 'none',
  transform: 'translateY(-5%)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  width: 300,
  maxHeight: '80vh',
  zIndex: 99990,
});

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
  transform: 'translateY(0)',
});
