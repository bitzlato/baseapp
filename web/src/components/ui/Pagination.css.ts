import { styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { vars } from 'web/src/theme/vars.css';

export const itemBase = sprinkles({
  fontFamily: 'brand',
  fontSize: 'medium',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'strong',
  lineHeight: 'base',
  color: 'text',
  height: '11x',
  borderRadius: '1.5x',
  px: '1x',
  minWidth: '11x',
});

export const item = styleVariants({
  base: [itemBase],
  button: [
    itemBase,
    {
      cursor: 'pointer',
      selectors: {
        '&:hover, &:focus': {
          backgroundColor: vars.colors.paginationItemBgHover,
        },
      },
    },
  ],
  active: [itemBase, { backgroundColor: vars.colors.paginationItemBgActive }],
  disabled: [itemBase, { color: vars.colors.paginationItemTextDisabled }],
});
