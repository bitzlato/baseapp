import React from 'react';
import { Currency } from '@bitzlato/money-js';
import { createMoney } from 'src/helpers/money';
import { Box } from 'src/components/Box/Box';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { getCurrency } from './helpers';

interface Props {
  label: string;
  ccy: Currency;
  limit: number;
  price: string;
}

export const PriceLimit: React.FC<Props> = (props) => {
  return (
    <Box row spacing>
      <span>{props.label}:</span>
      <MoneyFormat money={createMoney(props.limit, props.ccy).divide(props.price)} />
      <span>
        (<MoneyFormat money={createMoney(props.limit, USD_CCY)} />)
      </span>
    </Box>
  );
};

const USD_CCY = getCurrency('USD', 2);
