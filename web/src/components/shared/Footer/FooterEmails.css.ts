import { style } from '@vanilla-extract/css';
import { sizeVars } from 'web/src/theme/vars.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const root = style([
  {
    display: 'flex',
    gap: sizeVars['2x'],
  },
  responsiveStyle({
    mobile: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: `${sizeVars['7x']} ${sizeVars['6x']} 0`,
    },
    tablet: {
      flexDirection: 'column',
      width: '100%',
      padding: 0,
    },
  }),
]);
