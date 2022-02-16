import { globalStyle } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

export const header = sprinkles({
  fontFamily: 'brand',
});

globalStyle(`${header} svg`, {
  verticalAlign: 'middle',
});
