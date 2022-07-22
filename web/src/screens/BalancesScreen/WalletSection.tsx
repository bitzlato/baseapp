import { FC } from 'react';
import { Balance } from 'web/src/types/balances.types';
import { SECTION_WITHDRAW } from './sections';
import { Withdraw } from './withdraw/Withdraw';
import { WithdrawSkeleton } from './withdraw/WithdrawSkeleton';

interface Props {
  balance?: Balance | undefined;
  section?: string | undefined;
}

export const WalletSection: FC<Props> = ({ balance, section }) => {
  if (section === SECTION_WITHDRAW) {
    if (!balance) {
      return <WithdrawSkeleton />;
    }

    return <Withdraw balance={balance} />;
  }

  return <div>oops!</div>;
};
