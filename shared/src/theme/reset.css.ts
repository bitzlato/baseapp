import { style } from '@vanilla-extract/css';

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  minWidth: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',

  selectors: {
    '&:before, &:after': {
      boxSizing: 'border-box',
    },
  },
});

export const button = style({
  background: 0,
  border: 0,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',
});

export const element = {
  button,
};
