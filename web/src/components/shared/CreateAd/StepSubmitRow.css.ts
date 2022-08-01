import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export const container = style([
  {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  responsiveStyle({
    mobile: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginRight: '0',
      marginBottom: '2x',
    },
    tablet: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: '5x',
      marginBottom: '0',
    },
  }),
]);

export const submitContainer = style(
  responsiveStyle({
    mobile: {
      width: '100%',
      maxWidth: 400,
      marginLeft: 'auto',
    },
    tablet: {
      width: '30%',
      minWidth: 192,
    },
  }),
);
