import { style } from '@vanilla-extract/css';
import { item as dropdownItem } from 'web/src/components/shared/Header/Dropdown/DropdownItem.css';

export const item = style([
  dropdownItem,
  {
    fontWeight: '600',
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
  },
]);

export const itemOpened = style({
  selectors: {
    '&::after': {
      transform: 'rotate(-180deg)',
    },
  },
});

export const list = style({
  opacity: 0,
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
});

export const listOpened = style({
  opacity: 1,
  maxHeight: 999,
});
