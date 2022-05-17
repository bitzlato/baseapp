import * as React from 'react';
import { CurrencyTicker } from '../CurrencyTicker/CurrencyTicker';
import { AmountFormat, AmountFormatProps } from '../AmountFormat/AmountFormat';
import { Box, TextColor } from '../Box/Box';

export interface MoneyFormatProps extends AmountFormatProps {
  zeroSymbol?: string | undefined;
  textColor?: TextColor | undefined;
}

export const MoneyFormat: React.FC<MoneyFormatProps> = ({
  money,
  zeroSymbol,
  textColor,
  ...rest
}) => {
  const amount = (
    <Box as="span" textColor={textColor}>
      {zeroSymbol !== undefined && money.isZero() ? (
        zeroSymbol
      ) : (
        <AmountFormat money={money} {...rest} />
      )}
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
