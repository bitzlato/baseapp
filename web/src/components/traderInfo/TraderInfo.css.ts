import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const sideBlock = style({
  width: '100%',
});

export const iconButton = style({
  border: `solid 1px ${vars.colors.traderBorder}`,
  marginLeft: '8px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.traderBgHover,
    },
  },
});

export const blocked = style({
  backgroundColor: vars.colors.traderBlocked,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.traderBlockedBgHover,
    },
  },
});

export const favorited = style({
  backgroundColor: vars.colors.traderFavorited,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.traderFavoritedBgHover,
    },
  },
});
