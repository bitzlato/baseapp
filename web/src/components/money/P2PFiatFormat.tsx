import { Currency } from '@bitzlato/money-js';
import { FC } from 'react';
import { AmountFormat, AmountFormatProps } from 'web/src/components/AmountFormat/AmountFormat';
import { getP2PFiatOptionsByCode } from '../AmountFormat/getFormatOptionsByLanguage';

export interface Props extends AmountFormatProps {
  cryptoCurrency: Currency;
}

export const P2PFiatFormat: FC<Props> = ({ cryptoCurrency, ...props }) => (
  <AmountFormat {...props} {...getP2PFiatOptionsByCode(cryptoCurrency.code)} />
);
