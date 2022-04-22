import { style } from '@vanilla-extract/css';
import { fontSizeVars } from 'web/src/theme/vars.css';

export const smSize = style({
  fontSize: fontSizeVars.small,
});

export const lgSize = style({
  fontSize: 'var(--font-size-bigger)',
});

export const xlSize = style({
  fontSize: 'var(--font-size-xl)',
  fontWeight: '500',
});

export const titleSize = style({
  fontSize: '18px',
  fontWeight: '600',
});

export const descriptionSize = style({
  fontSize: '14px',
});

export const defaultSize = style({
  fontSize: 'var(--font-size)',
});

export const primaryColor = style({
  color: 'var(--primary-text-color)',
});

export const secondaryColor = style({
  color: 'var(--secondary-contrast-cta-color)',
});

export const warningColor = style({
  color: 'var(--system-yellow)',
});

export const successColor = style({
  color: 'var(--system-green)',
});

export const failedColor = style({
  color: 'var(--system-red)',
});

export const bidColor = style({
  color: 'var(--bids)',
});

export const askColor = style({
  color: 'var(--asks)',
});

export const bold = style({
  fontWeight: '500',
});

export const ellipsis = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const center = style({
  textAlign: 'center',
});

export const noWrap = style({
  whiteSpace: 'nowrap',
});

export const capitalizeTransform = style({
  textTransform: 'capitalize',
});

export const uppercaseTransform = style({
  textTransform: 'uppercase',
});
