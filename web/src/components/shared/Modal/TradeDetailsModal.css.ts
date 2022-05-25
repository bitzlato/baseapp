import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

const borderStyle = `1px solid ${vars.colors.tradeInputDetailsBorder}`;

export const tradeDetailItemStyle = style({
  backgroundColor: vars.colors.tradeDetailsItem,
  borderLeft: borderStyle,
  borderRight: borderStyle,

  ':first-child': {
    borderTop: borderStyle,
  },

  ':last-child': {
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    borderBottom: borderStyle,
  },

  ':hover': {
    backgroundColor: vars.colors.tradeDetailsItemHover,
    cursor: 'pointer',
  },

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
