import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { sizeVars, vars } from 'web/src/theme/vars.css';

export const stepCircleSize = 8;
export const stepCircleMargin = 12;
export const lineWidth = sizeVars['1x'];

export const step = style([
  sprinkles({
    position: 'relative',
    borderRadius: '1.5x',
  }),
  {
    '::after': {
      content: '',
      position: 'absolute',
      backgroundColor: vars.colors.createAdLine,
      width: lineWidth,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      top: `calc(50% + ${stepCircleMargin}px + ${stepCircleSize}px)`,
      left: '-20px',
    },

    '::before': {
      content: '',
      position: 'absolute',
      backgroundColor: vars.colors.createAdLine,
      width: lineWidth,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      top: `calc(-1 * ${sizeVars['4x']})`,
      left: '-20px',
    },

    selectors: {
      '&:not(:last-child)::after': {
        height: `calc(50% - ${stepCircleMargin}px - ${stepCircleSize}px + 2px)`,
      },
      '&:not(:first-child)::before': {
        height: `calc(${sizeVars['4x']} + 50% - ${stepCircleMargin}px)`,
      },
    },
  },
]);

export const stepCompletedOrActive = style({
  '::before': {
    backgroundColor: vars.colors.text,
  },
  '::after': {
    backgroundColor: vars.colors.text,
  },
});

export const stepNext = style({
  '::before': {
    backgroundColor: vars.colors.text,
  },
});

export const stepDot = style({
  position: 'absolute',
  top: '50%',
  left: `calc(-20px - ${lineWidth} / 2)`,
  width: stepCircleSize,
  height: stepCircleSize,
  backgroundColor: vars.colors.createAdLine,
  borderRadius: '50%',

  selectors: {
    [`${stepCompletedOrActive} &`]: {
      backgroundColor: vars.colors.text,
    },
  },
});

export const activeValue = style([
  sprinkles({
    textOverflow: 'ellipsis',
  }),
  responsiveStyle({
    mobile: {
      maxWidth: '100%',
    },
    tablet: {
      maxWidth: '40%',
    },
  }),
]);
