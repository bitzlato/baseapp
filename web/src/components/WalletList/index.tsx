import React, { useCallback } from 'react';
import { WalletItem } from 'src/components/WalletItem/WalletItem';
import { Wallet } from '../../modules';
export interface WalletListProps {
  walletItems: Wallet[];
  activeIndex: number;
  /**
   * Callback function which is invoked whenever wallet item is clicked
   */
  onWalletSelectionChange(item: Wallet): void;
  /**
   * Callback function which is invoked whenever wallet item is clicked
   */
  onActiveIndexChange(index: number): void;
}

/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export const WalletList: React.FC<WalletListProps> = ({
  onWalletSelectionChange,
  onActiveIndexChange,
  activeIndex,
  walletItems,
}) => {
  const handleClick = useCallback(
    (i: number, p: Wallet) => {
      if (onWalletSelectionChange) {
        onWalletSelectionChange(p);
      }
      if (onActiveIndexChange) {
        onActiveIndexChange(i);
      }
    },
    [onWalletSelectionChange, onActiveIndexChange],
  );

  return (
    <div className="cr-wallet-list">
      {walletItems.map((wallet: Wallet, i: number) => (
        <WalletItem
          key={wallet.currency.code}
          wallet={wallet}
          active={activeIndex === i}
          onClick={() => handleClick(i, wallet)}
        />
      ))}
    </div>
  );
};
