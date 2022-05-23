import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const input = style([
  {
    paddingRight: '40px',
    selectors: {
      '&[readonly], &:disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  sprinkles({
    textOverflow: 'ellipsis',
  }),
]);

export const inputRightControls = style({
  position: 'absolute',
  top: '22px',
  right: '1px',
  transform: 'translateY(-50%)',
});

export const chevron = style({
  transition: 'transform 0.3s ease',
});

export const chevronOpened = style({
  transform: 'rotate(-180deg)',
});

export const dropdown = style({
  fontFamily: "'Montserrat', helvetica, sans-serif",
  position: 'absolute',
  top: '100%',
  left: 0,
  opacity: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  pointerEvents: 'none',
  transform: 'translateY(-5%)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  width: '100%',
  maxHeight: '80vh',
  zIndex: 10000,
});

export const dropdownOpened = style({
  opacity: 1,
  pointerEvents: 'initial',
  transform: 'translateY(0)',
});

export const controls = style(
  responsiveStyle({
    mobile: {
      visibility: 'visible',
    },
    desktop: {
      visibility: 'hidden',
    },
  }),
);

export const controlsOpen = style(
  responsiveStyle({
    desktop: {
      visibility: 'visible',
    },
  }),
);

export const addressName = style(
  responsiveStyle({
    mobile: {
      width: '100%',
    },
    desktop: {
      width: '25%',
    },
  }),
);
