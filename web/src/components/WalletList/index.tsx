import React from 'react';
import { WalletItem } from 'src/components/WalletItem/WalletItem';
import { Wallet } from '../../modules';

export interface WalletListProps {
  walletItems: Wallet[];
  activeIndex: number;
  onWalletSelectionChange(item: Wallet, index: number): void;
}

export const WalletList: React.FC<WalletListProps> = ({
  onWalletSelectionChange,
  activeIndex,
  walletItems,
}) => {
  return (
    <div className="cr-wallet-list">
      {walletItems.map((wallet: Wallet, i: number) => (
        <WalletItem
          key={wallet.currency.code}
          wallet={wallet}
          active={activeIndex === i}
          onClick={() => onWalletSelectionChange(wallet, i)}
        />
      ))}
    </div>
  );
};
