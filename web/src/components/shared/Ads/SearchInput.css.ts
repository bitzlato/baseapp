import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const searchInput = style({
  selectors: {
    '&::placeholder': {
      color: vars.colors.selectSearchInputPlaceholder,
    },
  },
});
