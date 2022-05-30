import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { zIndexVars } from 'web/src/theme/vars.css';

const drawerWidth = '368px';

const drawerBase = style({
  position: 'fixed',
  opacity: 0,
  top: 0,
  right: `-${drawerWidth}`,
  width: drawerWidth,
  overflowY: 'auto',
  zIndex: -1,
});

export const drawer = style([
  drawerBase,
  sprinkles({
    mt: { mobile: '14x', tablet: '16x' },
    bg: 'drawer',
    height: 'full',
  }),
]);

export const openDrawer = style({
  transition: 'transform .4s ease, margin-top .1s ease-in-out',
  transform: `translateX(-${drawerWidth})`,

  opacity: 1,
  zIndex: zIndexVars.drawer,
});
