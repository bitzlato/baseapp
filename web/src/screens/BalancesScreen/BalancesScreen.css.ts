import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const sidebar = style({
  width: '27%',
  borderRight: `1px solid ${vars.colors.walletSidebarBorderRight}`,
});
