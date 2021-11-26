import * as React from 'react';
import { Money } from '@bitzlato/money-js';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { AmountFormat } from '../AmountFormat/AmountFormat';
import { Box } from '../Box/Box';

interface Props {
  money: Money;
}

export const MoneyFormat: React.FC<Props> = ({ money }) => {
  return (
    <Box as="span" row spacing="sm">
      <Box as="span" textColor="primary">
        <AmountFormat money={money} />
      </Box>
      <CurrencyTicker symbol={money.currency.code} />
    </Box>
  );
};
