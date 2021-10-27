import * as React from 'react';
import { Money } from '@trzmaxim/money';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { Wallet } from 'src/modules/user/wallets/types';
import { CryptoIcon } from '../../../components/CryptoIcon';
import { areEqualSelectedProps } from '../../../helpers/areEqualSelectedProps';

interface Props {
  wallet: Wallet;
  onClick: (v: string) => void;
}

const WalletItemComponent: React.FC<Props> = ({ wallet, onClick }) => {
  return (
    <div
      className="cr-mobile-wallet-item"
      onClick={() => onClick(wallet.currency.code.toLowerCase())}
    >
      <div>
        <CryptoIcon className="cr-wallet-item__icon" code={wallet.icon_id} />
        <span className="cr-mobile-wallet-item__currency">{wallet.currency.code}</span>
        <span className="cr-mobile-wallet-item__name">{wallet.name}</span>
      </div>
      <div className="cr-mobile-wallet-item__balance">
        <MoneyFormat money={wallet.balance || Money.fromDecimal(0, wallet.currency)} />
      </div>
    </div>
  );
};

export const WalletItem = React.memo(
  WalletItemComponent,
  areEqualSelectedProps('wallet', ['currency', 'name', 'balance', 'fixed']),
);
