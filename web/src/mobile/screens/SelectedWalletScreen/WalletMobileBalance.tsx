import React from 'react';
import { useSelector } from 'react-redux';
import { WalletItemData } from 'src/components/WalletItem/WalletItem';
import { Box } from 'src/components/Box/Box';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { getCurrencyCodeSymbol } from 'src/helpers/getCurrencySymbol';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { useT } from 'src/hooks/useT';
import { NoAmountFormat } from 'web/src/components/Format/NoAmountFormat';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { Rate } from 'web/src/screens/WalletsScreen/Rate';

interface Props {
  wallet: WalletItemData;
}

export const WalletMobileBalance: React.FC<Props> = ({ wallet }) => {
  const t = useT();
  const user = useSelector(selectUserInfo);

  const cryptoCurrency = getCurrencyCodeSymbol(wallet.currency);
  const userCurrency = user.bitzlato_user?.user_profile.currency ?? 'USD';

  return (
    <Box bgColor="body" padding="2X3" col spacing="2">
      <Box row justify="between">
        <Box flex="1" col spacing align="center">
          <CryptoCurrencyIcon size="medium" currency={wallet.currency} />
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
          <Rate
            cryptoCurrency={cryptoCurrency}
            fiatCurrency={userCurrency}
            fetchRate={wallet.balanceP2P !== undefined}
          />
        </Box>
      </Box>
    </Box>
  );
};
