import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const ads = style({
  background: vars.colors.dropdown,
});

export const col1 = style({
  width: 'calc((100% - 160px) * 0.2 + 38px)',
});

export const col2 = style({
  width: 'calc((100% - 160px) * 0.3)',
});

export const col3 = style({
  width: 'calc((100% - 160px) * 0.2)',
});

export const col4 = style({
  width: 'calc((100% - 160px) * 0.3)',
});

export const col5 = style({
  width: '102px',
});
