import { globalStyle, style } from '@vanilla-extract/css';

export const walletAddressInput = style({});

globalStyle(`${walletAddressInput} > input`, {
  paddingRight: 80,
});

globalStyle(`${walletAddressInput} > input[readonly]`, {
  backgroundColor: 'inherit',
});

export const walletAddressButtons = style({
  alignItems: 'center',
  bottom: 0,
  display: 'inline-flex',
  padding: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});
