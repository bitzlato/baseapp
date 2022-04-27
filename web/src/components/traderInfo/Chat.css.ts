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

export const chatInput = style({
  border: 'none',
  width: '100%',
});

export const chatInputComponent = style({
  border: 'none',
  width: '100%',
  backgroundColor: 'transparent !important',
  paddingLeft: '8px',
});
