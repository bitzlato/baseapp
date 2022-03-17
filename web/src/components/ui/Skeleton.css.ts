import { keyframes, style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

const skeletonKeyframe = keyframes({
  '100%': { transform: 'translateX(100%)' },
});

export const skeleton = style({
  backgroundColor: vars.colors.skeleton,
  display: 'inline-flex',
  lineHeight: 1,
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,

  selectors: {
    '&::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `linear-gradient(90deg, transparent, ${vars.colors.skeletonHighlighted}, transparent)`,
      transform: 'translateX(-100%)',

      animationName: skeletonKeyframe,
      animationDirection: 'normal',
      animationDuration: '1.5s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  },
});
