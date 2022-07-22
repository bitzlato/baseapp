import { FC } from 'react';
import { Balance } from 'web/src/types/balances.types';
import { WithdrawMarketForm } from './WithdrawMarketForm';

interface Props {
  balance: Balance;
}

export const WithdrawMarket: FC<Props> = ({ balance }) => {
  return <WithdrawMarketForm balance={balance} />;
};
