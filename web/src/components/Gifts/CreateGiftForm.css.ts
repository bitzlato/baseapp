import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { vars } from 'web/src/theme/vars.css';

export const inputStepper = style(
  responsiveStyle({
    mobile: {
      maxWidth: 130,
    },
    tablet: {
      maxWidth: 96,
    },
  }),
);

export const inputComment = style([
  {
    minHeight: 70,
    maxWidth: 309,
  },
]);

export const buttonSubmitContainer = style(
  responsiveStyle({
    mobile: {
      display: 'inline-block',
      width: '100%',
      maxWidth: 430,
    },
    tablet: {
      width: 'auto',
      minWidth: 202,
    },
  }),
);

export const willBlocked = style(
  responsiveStyle({
    mobile: {
      maxWidth: 330,
      backgroundColor: vars.colors.textInputControl,
      textAlign: 'center',
    },
    tablet: {
      maxWidth: '100%',
      backgroundColor: 'transparent',
      textAlign: 'left',
    },
  }),
);

export const maxCount = style(
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
    },
    tablet: {
      maxWidth: 170,
    },
  }),
);
