import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import * as resetStyles from 'web/src/theme/reset.css';

export const tabs = style({
  selectors: {
    '&::-webkit-scrollbar': {
      height: 0,
    },
  },
});

export const tab = style([
  resetStyles.base,
  sprinkles({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    height: '11x',
    px: '4x',
    borderRadius: '1.5x',
    fontWeight: 'strong',
    color: { default: 'btnClarifiedText', hover: 'btnClarifiedText' },
    textDecoration: { default: 'none', hover: 'none' },
    cursor: 'pointer',
    backgroundColor: 'btnClarifiedBg',
  }),
  {
    selectors: {
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
]);

export const tabActive = sprinkles({
  backgroundColor: 'btnClarifiedBgActive',
  color: { default: 'btnClarifiedTextActive', hover: 'btnClarifiedTextActive' },
});
