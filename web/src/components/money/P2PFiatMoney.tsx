import { Currency } from '@bitzlato/money-js';
import { FC } from 'react';
import { getP2PFiatOptionsByCode } from '../AmountFormat/getFormatOptionsByLanguage';
import { MoneyFormat, MoneyFormatProps } from '../MoneyFormat/MoneyFormat';

export interface Props extends MoneyFormatProps {
  cryptoCurrency: Currency;
}

export const P2PMoneyFormat: FC<Props> = ({ cryptoCurrency, ...props }) => (
  <MoneyFormat {...props} {...getP2PFiatOptionsByCode(cryptoCurrency.code)} />
);
