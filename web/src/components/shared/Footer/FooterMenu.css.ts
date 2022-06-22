import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const title = sprinkles({
  color: 'footerTitle',
  fontSize: { mobile: 'medium', tablet: 'small' },
  fontWeight: 'strong',
  mb: '4x',
  textTransform: 'uppercase',
});

export const chevron = style({
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

export const chevronOpened = style({
  selectors: {
    '&::after': {
      transform: 'rotate(-180deg)',
    },
  },
});

export const links = style([
  {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 90,
    whiteSpace: 'nowrap',
    opacity: 0,
    maxHeight: 0,
    overflow: 'hidden',
    transition:
      'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out, margin-bottom 0.3s ease-in-out',
  },
  responsiveStyle({
    tablet: {
      opacity: 1,
      maxHeight: '100%',
    },
  }),
]);

export const linksOpened = style([
  sprinkles({
    mb: '6x',
  }),
  {
    opacity: 1,
    maxHeight: 150,
  },
]);
