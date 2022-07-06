import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
});

const sizes = {
  sm: 448,
  md: 550,
  lg: 960,
  xl: 1160,
  fullhd: 1920,
} as const;
export type Sizes = keyof typeof sizes;

export const container = styleVariants(sizes, (maxWidth) => [base, { maxWidth }]);
