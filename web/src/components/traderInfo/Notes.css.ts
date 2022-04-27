import { style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';

export const notesInput = style({
  border: 'none',
  width: '100%',
  backgroundColor: 'transparent !important',
});

export const notesInputComponent = style({
  border: 'none',
  backgroundColor: 'transparent !important',
});

export const notesButton = style({
  backgroundColor: vars.colors.notesBg,
  minWidth: '56px',
  height: 'auto',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.traderBgHover,
    },
  },
});
