import * as React from 'react';
import { Money } from '@bitzlato/money-js';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { AmountFormat } from '../AmountFormat/AmountFormat';
import { Box, TextColor } from '../Box/Box';

interface Props {
  money: Money;
  zeroSymbol?: string | undefined;
  textColor?: TextColor | undefined;
}

export const MoneyFormat: React.FC<Props> = ({ money, zeroSymbol, ...props }) => {
  const amount = (
    <Box as="span" textColor={'textColor' in props ? props.textColor : 'primary'}>
      {zeroSymbol !== undefined && money.isZero() ? zeroSymbol : <AmountFormat money={money} />}
    </Box>
  );

  const ticker = <CurrencyTicker symbol={money.currency.code} />;

  return (
    <Box as="span">
      {money.currency.code.length > 1 ? (
        <>
          {amount}
          &nbsp;
          {ticker}
        </>
      ) : (
        <>
          {ticker}
          {amount}
        </>
      )}
    </Box>
  );
};
