import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { sizeVars } from 'web/src/theme/vars.css';

export const inputContainer = sprinkles({
  position: 'relative',
  display: 'flex',
  minHeight: '12x',
  fontSize: 'medium',
  lineHeight: 'medium',
});

export const input = style([
  sprinkles({
    display: 'block',
    width: 'full',
    height: 'auto',
    pt: '4x',
    px: '4x',
    borderStyle: 'solid',
    borderColor: 'inputBorder',
    borderWidth: '1x',
    borderRadius: '1.5x',
    backgroundColor: 'transparent',
    color: 'text',
    fontFamily: 'brand',
  }),
]);

export const label = style([
  sprinkles({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pt: '1x',
    px: '4x',
    fontSize: 'caption',
    lineHeight: 'small',
    color: 'inputPlaceholder',
  }),
  {
    transition: 'all .2s ease',
  },
]);

globalStyle(`${input}:not(:focus):placeholder-shown + ${label}`, {
  paddingTop: 2,
  fontSize: '100%',
  lineHeight: sizeVars['11x'],
});
