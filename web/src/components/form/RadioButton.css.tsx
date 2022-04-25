import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const container = style({
  display: 'flex',
  justifyContent: 'stretch',
  border: `1px solid ${vars.colors.secondary}`,
  borderRadius: '4px',
  flexWrap: 'nowrap',
  overflow: 'hidden',
});

export const controlBase = style({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  fontWeight: 'normal',
  width: '100%',

  selectors: {
    '&:hover': {
      color: `${vars.colors.btnPrimaryBg}`,
    },
  },
});

export const control = styleVariants({
  base: [controlBase],
  disabled: [],
  active: [
    controlBase,
    {
      display: 'flex',
      backgroundColor: `${vars.colors.btnPrimaryBg}`,
      color: '#000 !important',
    },
  ],
});
