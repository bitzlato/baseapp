import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { useMemberLevelFetch } from 'src/hooks/useMemberLevelsFetch';
import { Subheader } from 'src/mobile/components';
import { useGeneralWallet } from 'src/hooks/useGeneralWallets';
import { WalletMobileBalance } from '../SelectedWalletScreen/WalletMobileBalance';
import { useT } from 'src/hooks/useT';
import { Box } from 'src/components/Box/Box';
import { Transfer } from 'src/containers/Wallets/Transfer';

export const WalletTransfer: React.FC = () => {
  const currency = useParams<{ currency?: string }>().currency?.toUpperCase() ?? '';
  const t = useT();
  const history = useHistory();

  useMemberLevelFetch();

  const wallet = useGeneralWallet(currency);

  return (
    <Box col spacing="sm">
      <Subheader
        title={t('Transfer.noun')}
        backTitle={t('page.body.wallets.balance')}
        onGoBack={() => history.goBack()}
      />
      {wallet && (
        <>
          <WalletMobileBalance wallet={wallet} />
          {wallet.hasTransfer && (
            <Box bgColor="body" padding="2X3">
              <Transfer
                currency={wallet.balance.currency}
                balanceMarket={wallet.balanceMarket.toString()}
                balanceP2P={wallet.balanceP2P.toString()}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
