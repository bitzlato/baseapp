import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useMemberLevelFetch } from 'src/hooks/useMemberLevelsFetch';
import { useRangerConnectFetch } from 'src/hooks';
import { selectWallet } from 'src/modules/user/wallets';
import { Subheader } from 'src/mobile/components';
import { DepositCrypto } from 'src/components/DepositCrypto';
import { useT } from 'src/hooks/useT';
import { useGeneralWallet } from 'src/hooks/useGeneralWallets';
import { WalletMobileBalance } from '../SelectedWalletScreen/WalletMobileBalance';
import { Box } from 'src/components/Box/Box';

export const WalletDeposit: React.FC = () => {
  const t = useT();
  const history = useHistory();
  const currency = useParams<{ currency?: string }>().currency?.toUpperCase() ?? '';
  const wallet = useSelector(selectWallet(currency));

  useRangerConnectFetch();
  useMemberLevelFetch();

  const generalWallet = useGeneralWallet(currency);

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('page.body.wallets.tabs.deposit')}
        backTitle={t('page.body.wallets.balance')}
        onGoBack={() => history.goBack()}
      />
      {generalWallet && <WalletMobileBalance wallet={generalWallet} />}
      {wallet && (
        <Box bgColor="body" padding="2X3">
          <DepositCrypto wallet={wallet} />
        </Box>
      )}
    </Box>
  );
};
