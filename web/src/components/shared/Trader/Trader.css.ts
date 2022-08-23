import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars } from 'web/src/theme/vars.css';

export const leftBlock = style(
  responsiveStyle({
    mobile: {
      width: '100%',
      marginBottom: sizeVars['4x'],
    },
    desktop: {
      width: '380px',
      marginRight: sizeVars['6x'],
      marginBottom: 0,
      flexShrink: 0,
    },
  }),
);

export const singleContainer = style({
  minHeight: 'calc(100vh - 210px)',
});

export const stats = style([
  {
    display: 'grid',
    gridGap: sizeVars['4x'],
    marginBottom: sizeVars['4x'],
  },
  responsiveStyle({
    tablet: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    desktop: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    desktopXXL: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  }),
]);

export const stat = style([
  {
    height: 128,
  },
]);
