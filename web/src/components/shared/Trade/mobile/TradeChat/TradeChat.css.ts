import { style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { zIndexVars } from 'web/src/theme/vars.css';

const chatWidth = '100%';

const chatBase = style({
  position: 'fixed',
  opacity: 0,
  top: 0,
  right: `-${chatWidth}`,
  width: chatWidth,
  overflowY: 'auto',
  zIndex: -1,
});

export const mobileChat = style([
  chatBase,
  sprinkles({
    bg: 'drawer',
    height: 'full',
  }),
]);

export const openMobileChat = style({
  transition: 'transform .4s ease, margin-top .1s ease-in-out',
  transform: `translateX(-${chatWidth})`,

  opacity: 1,
  zIndex: zIndexVars.chat,
});
