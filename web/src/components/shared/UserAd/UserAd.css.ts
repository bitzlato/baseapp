import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { sizeVars } from 'web/src/theme/vars.css';

export const unactiveAlert = style({
  position: 'relative',
  width: '50%',
  top: `calc(-1 * ${sizeVars['12x']})`,
  marginBottom: `calc(-1 * ${sizeVars['12x']})`,
  marginLeft: 'auto',
});

export const loadingContainer = style({
  minHeight: 580,
});

export const emptyContainer = style({
  maxWidth: 420,
});

export const emptyLink = sprinkles({
  color: { default: 'btnPrimaryBg', hover: 'btnPrimaryBgHover' },
});
