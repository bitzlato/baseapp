import React from 'react';
import { WalletItem, WalletItemData } from 'src/components/WalletItem/WalletItem';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import s from 'src/components/WalletItem/WalletItem.postcss';

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
  const t = useT();
  return (
    <Box col className={className}>
      {walletItems.length ? (
        <Box
          grow
          row
          justify="between"
          textSize="sm"
          padding={isMobileDevice ? '2X3' : '2'}
          className={s.itemHeader}
        >
          <span>{t('Coin')}</span>
          <span>{t('Total balance')}</span>
        </Box>
      ) : null}
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
