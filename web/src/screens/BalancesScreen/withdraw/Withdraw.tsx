import { FC } from 'react';
import { WithdrawP2P } from 'web/src/containers/Withdraw/WithdrawP2P';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { useT } from 'web/src/hooks/useT';
import {
  WalletSelectBalance,
  WalletSelectBalanceValue,
} from 'web/src/screens/BalancesScreen/WalletSelectBalance';
import { Balance } from 'web/src/types/balances.types';
import { WithdrawMarket } from './WithdrawMarket';

interface Props {
  balance: Balance;
}

export const Withdraw: FC<Props> = ({ balance }) => {
  const t = useT();
  const [balanceType, setBalanceType] = useStateWithDeps<
    WalletSelectBalanceValue | undefined
  >(() => {
    if (balance.p2pBalance) {
      return 'p2p';
    }

    if (balance.marketBalance) {
      return 'market';
    }

    return undefined;
  }, [balance]);

  return (
    <>
      <WalletSelectBalance balance={balance} value={balanceType} onChange={setBalanceType} />
      {balanceType === 'p2p' ? (
        <WithdrawP2P currencyCode={balance.cryptoCurrency.code} />
      ) : (
        <WithdrawMarket balance={balance} />
      )}
    </>
  );
};
