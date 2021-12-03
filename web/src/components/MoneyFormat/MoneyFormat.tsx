import * as React from 'react';
import { Money } from '@bitzlato/money-js';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { AmountFormat } from '../AmountFormat/AmountFormat';
import { Box } from '../Box/Box';

interface Props {
  money: Money;
  zeroSymbol?: string;
}

export const MoneyFormat: React.FC<Props> = ({ money, zeroSymbol }) => {
  return (
    <Box as="span">
      <Box as="span" textColor="primary">
        {zeroSymbol !== undefined && money.isZero() ? zeroSymbol : <AmountFormat money={money} />}
      </Box>
      &nbsp;
      <CurrencyTicker symbol={money.currency.code} />
    </Box>
  );
};
