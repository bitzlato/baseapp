import React from 'react';
import { Money } from '@bitzlato/money-js';
import { Box } from 'src/components/Box/Box';
import s from './Balance.postcss';
import { NoAmountFormat } from 'web/src/components/Format/NoAmountFormat';

interface BalanceProps {
  title: string;
  money: Money | undefined;
}

export const Balance: React.FC<BalanceProps> = (props) => {
  return (
    <Box flex1 padding="3" col justify="between" className={s.balance}>
      <Box textSize="lg">{props.title}</Box>
      <Box style={{ fontSize: 30 }}>
        <NoAmountFormat money={props.money} />
      </Box>
    </Box>
  );
};
