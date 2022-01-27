import { style } from '@vanilla-extract/css';

export const language = style({
  cursor: 'pointer',
  fontWeight: '600',
  textTransform: 'capitalize',
  userSelect: 'none',

  selectors: {
    '&::after': {
      borderBottom: '0',
      borderLeft: '.3em solid transparent',
      borderRight: '.3em solid transparent',
      borderTop: '.3em solid',
      content: '',
      display: 'inline-block',
      marginLeft: '.255em',
      verticalAlign: '.255em',
      transition: 'transform 0.3s ease',
    },
  },
});

export const languageOpened = style({
  selectors: {
    '&::after': {
      transform: 'rotate(-180deg)',
    },
  },
});
