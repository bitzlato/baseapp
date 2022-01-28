import React from 'react';
import { WalletItem, WalletItemData } from 'src/components/WalletItem/WalletItem';
import { Box } from 'src/components/Box/Box';

export interface WalletListProps {
  className?: string;
  walletItems: WalletItemData[];
  activeIndex: number;
  onWalletSelectionChange(index: number): void;
  isMobileDevice?: boolean;
}

export const WalletList: React.FC<WalletListProps> = ({
  className,
  onWalletSelectionChange,
  activeIndex,
  walletItems,
  isMobileDevice,
}) => {
  return (
    <Box col className={className}>
      {walletItems.map((wallet, i) => (
        <WalletItem
          key={wallet.currency}
          wallet={wallet}
          active={activeIndex === i}
          onClick={() => onWalletSelectionChange(i)}
          isMobileDevice={isMobileDevice}
        />
      ))}
    </Box>
  );
};
