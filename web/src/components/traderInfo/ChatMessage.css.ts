import { style } from '@vanilla-extract/css';

export const chatToMsgBlock = style({
  display: 'inline-block',
  maxWidth: '75%',
  borderRadius: '4px',
  borderTopLeftRadius: '0px',
});

export const chatFromMsgBlock = style({
  display: 'inline-block',
  maxWidth: '75%',
  borderRadius: '4px',
  borderTopRightRadius: '0px',
});
