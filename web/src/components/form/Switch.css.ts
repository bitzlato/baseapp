import { style, styleVariants } from '@vanilla-extract/css';
import { radiiVars, transitionDurationVars, vars } from 'web/src/theme/vars.css';

export const switcherBase = style({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'middle',
  lineHeight: 0,
});

export const switcher = styleVariants({
  base: [switcherBase],
  disabled: [switcherBase, { opacity: 0.3 }],
});

export const input = style({
  border: '0px none',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute',
});

export const trackBase = style({
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'flex-start',
  cursor: 'pointer',
  borderRadius: radiiVars.circle,
  padding: 1,
  width: 46,
  height: 26,
  transitionProperty: 'border-color',
  transitionDuration: transitionDurationVars.base,
  border: `1px solid ${vars.colors.switcherTrack}`,
  selectors: {
    [`${input}:focus + &`]: {
      boxShadow: `0px 0px 0px 2px ${vars.colors.switcherTrackShadow}`,
    },
  },
});

export const track = styleVariants({
  base: [trackBase],
  checked: [
    trackBase,
    {
      borderColor: vars.colors.switcherTrackChecked,
      selectors: {
        [`${input}:focus + &`]: {
          boxShadow: `0px 0px 0px 2px ${vars.colors.switcherTrackShadowChecked}`,
        },
      },
    },
  ],
});

export const thumbBase = style({
  backgroundColor: vars.colors.switcherThumb,
  transitionProperty: 'background-color, transform',
  transitionDuration: transitionDurationVars.base,
  borderRadius: radiiVars.circle,
  width: 22,
  height: 22,
});

export const thumb = styleVariants({
  base: [thumbBase],
  checked: [
    thumbBase,
    { backgroundColor: vars.colors.switcherThumbChecked, transform: 'translateX(20px)' },
  ],
});
