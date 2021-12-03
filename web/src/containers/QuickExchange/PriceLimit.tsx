import React, { useState, useMemo, useEffect } from 'react';
import { Currency } from '@bitzlato/money-js';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
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
      <MoneyFormat money={fromDecimalSilent(props.limit, props.ccy).divide(props.price)} />
      <span>
        (<MoneyFormat money={fromDecimalSilent(props.limit, USD_CCY)} />)
      </span>
    </Box>
  );
};

const USD_CCY = getCurrency('USD', 2);
