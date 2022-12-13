import { globalStyle } from '@vanilla-extract/css';

globalStyle('.pg-layout', {
  background: 'var(--main-background-color)',
  color: 'var(--secondary-contrast-cta-color)',
  minHeight: 'calc(100vh - 95px)',
  paddingLeft: 0,
  paddingRight: 0,
});

globalStyle('.pg-layout--mobile', {
  maxWidth: '100vw',
  minHeight: 'auto',
  minWidth: '100vw',
  paddingBottom: 'var(--mobile-footer-height)',
  paddingTop: 0,
  width: '100vw',
});

globalStyle('.trading-layout', {
  background: 'var(--main-background-color)',
});
