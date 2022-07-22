import { style, styleVariants } from '@vanilla-extract/css';
import { fontSizeVars, radiiVars, vars } from 'web/src/theme/vars.css';

export const base = style({
  display: 'inline-block',
  borderRadius: radiiVars['1x'],
  backgroundColor: vars.colors.currencyBadgeBackground,
  color: vars.colors.currencyBadgecolor,
});

const sizes = {
  small: {
    fontSize: fontSizeVars.caption,
    paddingLeft: 2,
    paddingRight: 2,
  },
  large: {
    fontSize: fontSizeVars.large,
    paddingLeft: 6,
    paddingRight: 6,
  },
} as const;

export const badge = styleVariants(sizes, (css) => [base, css]);
