import React from 'react';
import { WalletItemData } from 'src/components/WalletItem/WalletItem';
import { Box } from 'src/components/Box/Box';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';

interface Props {
  wallet: WalletItemData;
}

export const WalletMobileBalance: React.FC<Props> = ({ wallet }) => {
  const t = useT();

  return (
    <Box bgColor="body" padding="2X3" row justify="between">
      <Box grow col spacing align="center">
        <CryptoCurrencyIcon size="medium" currency={wallet.currency} />
        <Box textAlign="center">
          <Box textColor="primary" bold>
            {getCurrencyCodeSymbol(wallet.currency)}
          </Box>
          <span>{wallet.name}</span>
        </Box>
      </Box>
      <Box grow col spacing textColor="primary" bold>
        <Box row spacing justify="between">
          <span>{t('P2P Balance')}</span>
          <span>
            <AmountFormat money={wallet.balanceP2P} />
          </span>
        </Box>
        <Box row spacing justify="between">
          <span>{t('Market Balance')}</span>
          <span>
            <AmountFormat money={wallet.balanceMarket} />
          </span>
        </Box>
        <Box row spacing justify="between">
          <span>{t('Locked')}</span>
          <span>
            <AmountFormat money={wallet.locked} />
          </span>
        </Box>
      </Box>
    </Box>
  );
};
