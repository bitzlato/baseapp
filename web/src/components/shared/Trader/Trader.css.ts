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

export const stats = style({
  margin: '0 -8px',
  display: 'flex',
  flexWrap: 'wrap',
});

export const stat = style([
  {
    padding: '0 8px',
    marginBottom: 16,
    flex: '0 0 auto',
    height: '128px',
  },
  responsiveStyle({
    tablet: {
      width: '50%',
    },
    desktop: {
      width: '33%',
    },
    desktopXL: {
      width: '20%',
    },
  }),
]);
