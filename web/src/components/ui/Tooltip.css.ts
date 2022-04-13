import { style, styleVariants } from '@vanilla-extract/css';
import { radiiVars, vars, zIndexVars, sizeVars, fontSizeVars } from 'web/src/theme/vars.css';

export const TOOLTIP_TRANSITION_DELAY = 300;
const ARROW_HEIGHT = 7;

export const tooltipBase = style({
  position: 'absolute',
  pointerEvents: 'none',
  margin: 0,
  top: 0,
  right: 'auto',
  bottom: 'auto',
  left: 0,
  maxWidth: '100%',
  zIndex: zIndexVars.tooltip,
  opacity: 0,
  transition: `opacity ease-out ${TOOLTIP_TRANSITION_DELAY}ms`,
  borderRadius: radiiVars['2x'],
  backgroundColor: vars.colors.tooltip,
  color: vars.colors.tooltipText,
  padding: `${sizeVars['2x']} ${sizeVars['4x']}`,
  fontSize: fontSizeVars.medium,

  selectors: {
    '&::after': {
      content: '',
    },
  },
});

export const tooltip = styleVariants({
  base: [tooltipBase],
  enter: [
    tooltipBase,
    {
      opacity: 1,
    },
  ],
});

export const tooltipArrowBase = style({
  position: 'absolute',
  marginLeft: -7,
  width: 0,
  height: 0,
  borderLeft: `${ARROW_HEIGHT}px solid transparent`,
  borderRight: `${ARROW_HEIGHT}px solid transparent`,
});

export const tooltipArrow = styleVariants({
  bottom: [
    tooltipArrowBase,
    {
      borderBottom: `${ARROW_HEIGHT}px solid ${vars.colors.tooltip}`,
      top: -ARROW_HEIGHT,
    },
  ],
  top: [
    tooltipArrowBase,
    {
      borderTop: `${ARROW_HEIGHT}px solid ${vars.colors.tooltip}`,
      bottom: -ARROW_HEIGHT,
    },
  ],
});
