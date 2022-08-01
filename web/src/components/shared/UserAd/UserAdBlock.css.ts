import { style, styleVariants } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';
import { radiiVars, sizeVars, vars } from 'web/src/theme/vars.css';

export const containerBase = style(
  responsiveStyle({
    mobile: {
      padding: `${sizeVars['2x']} ${sizeVars['4x']}`,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: vars.colors.transparent,
      borderRadius: radiiVars['1.5x'],
      background: vars.colors.block,
    },
    tablet: {
      padding: `${sizeVars['5x']} ${sizeVars['0']}`,
      borderRadius: radiiVars['0'],
      borderBottomColor: vars.colors.cardHeaderBorderBottom,
      background: vars.colors.transparent,
    },
  }),
);

export const container = styleVariants({
  base: [containerBase],
  error: [
    containerBase,
    style(
      responsiveStyle({
        mobile: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomColor: vars.colors.danger,
        },
        tablet: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomColor: vars.colors.danger,
        },
      }),
    ),
  ],
});
