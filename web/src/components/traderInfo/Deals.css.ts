import { style } from '@vanilla-extract/css';
import { vars, zIndexVars } from 'web/src/theme/vars.css';

export const dataBlock = style({
  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      width: '100%',
      height: '200px',
      bottom: 0,
      backgroundImage: `linear-gradient(rgba(0,0,0,0), ${vars.colors.dropdown})`,
      zIndex: zIndexVars.shadeRows,
    },
  },
});
