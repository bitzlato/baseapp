import React from 'react';
import { WalletItemData } from 'src/components/WalletItem/WalletItem';
import { Box } from 'src/components/Box/Box';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import { NoAmountFormat } from 'web/src/components/Format/NoAmountFormat';

interface Props {
  wallet: WalletItemData;
}

export const WalletMobileBalance: React.FC<Props> = ({ wallet }) => {
  const t = useT();

  const cryptoCurrency = getCurrencyCodeSymbol(wallet.currency);

  return (
    <Box bgColor="body" padding="2X3" col spacing="2">
      <Box row justify="between">
        <Box flex="1" col spacing align="center">
          <CryptoCurrencyIcon size="9x" currency={wallet.currency} />
          <Box textAlign="center">
            <Box textColor="primary" bold>
              {cryptoCurrency}
            </Box>
            <span>{wallet.name}</span>
          </Box>
        </Box>
        <Box flex="golden" col spacing="2">
          <Box grow col spacing textColor="primary" bold>
            <Box row spacing justify="between">
              <span>{t('P2P Balance')}</span>
              <span>
                <NoAmountFormat money={wallet.balanceP2P} />
              </span>
            </Box>
            <Box row spacing justify="between">
              <span>{t('Exchange Balance')}</span>
              <span>
                <NoAmountFormat money={wallet.balanceMarket} />
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
      </Box>
    </Box>
  );
};
