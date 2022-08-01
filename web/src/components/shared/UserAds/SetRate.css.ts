import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from 'web/src/theme/vars.css';
import { input } from 'web/src/components/TextInputCustom/TextInputCustom.css';
import { loader } from '../../ui/Spinner.css';

export const selectedRate = style({});

globalStyle(`${selectedRate} *`, {
  color: vars.colors.advertsSelectedRate,
});

globalStyle(`${selectedRate} ${input.small}`, {
  borderColor: vars.colors.advertsSelectedRateInputBorder,
});

globalStyle(`${selectedRate} ${loader}`, {
  borderTopColor: vars.colors.spinner01,
  borderRightColor: vars.colors.spinner01,
  borderBottomColor: vars.colors.spinner01,
  borderLeftColor: vars.colors.advertsSelectedRateSpinner02,
});
