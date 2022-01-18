import React from 'react';
import { Money } from '@bitzlato/money-js';
import { Box } from 'src/components/Box/Box';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import s from './Balance.postcss';

interface BalanceProps {
  title: string;
  money: Money;
}

export const Balance: React.FC<BalanceProps> = (props) => {
  return (
    <Box flex1 padding="3" col justify="between" className={s.balance}>
      <Box textSize="lg">{props.title}</Box>
      <Box style={{ fontSize: 30 }}>
        <AmountFormat money={props.money} />
      </Box>
    </Box>
  );
};
