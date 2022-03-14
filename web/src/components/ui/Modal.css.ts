import { style, styleVariants } from '@vanilla-extract/css';
import { vars, zIndexVars } from 'web/src/theme/vars.css';

export const MODAL_TRANSITION_TIMEOUT = 300;

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: zIndexVars.modal,
  overflow: 'auto',
});

export const overlayEnter = style({});

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: vars.colors.backdrop,
  opacity: 0,
  transition: `opacity ease-out ${MODAL_TRANSITION_TIMEOUT}ms`,

  selectors: {
    [`${overlayEnter} &`]: {
      opacity: 1,
    },
  },
});

const modalBase = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 'calc(100% - 120px)',
  margin: '60px auto',
  padding: '0 16px',
  opacity: 0,
  transition: `opacity ease-out ${MODAL_TRANSITION_TIMEOUT}ms, transform ease-out ${MODAL_TRANSITION_TIMEOUT}ms`,
  transform: 'translateY(-5%)',

  selectors: {
    [`${overlayEnter} &`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

const modalMaxWidths = {
  md: 448,
  lg: 512,
  // xl: 576,
} as const;

export const modal = styleVariants(modalMaxWidths, (maxWidth) => [modalBase, { maxWidth }]);

export const cross = style({
  position: 'absolute',
  top: 0,
  right: 0,
});
