import * as React from 'react';
import { Money } from '@bitzlato/money-js';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { MoneyFormat } from '../MoneyFormat/MoneyFormat';
import { Box } from '../Box/Box';

interface Props {
  money: Money;
}

export const CurrencyMoney: React.FC<Props> = ({ money }) => {
  return (
    <Box as="span" row spacing="sm">
      <Box as="span" textColor="primary">
        <MoneyFormat money={money} />
      </Box>
      <CurrencyTicker symbol={money.currency.code} />
    </Box>
  );
};
