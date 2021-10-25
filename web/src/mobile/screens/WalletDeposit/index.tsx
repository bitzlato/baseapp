import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useMemberLevelFetch } from 'src/hooks/useMemberLevelsFetch';
import { useCurrenciesFetch, useRangerConnectFetch, useWalletsFetch } from 'src/hooks';
import { selectWallet, walletsAddressFetch, walletsFetch } from 'src/modules/user/wallets';
import { Subheader, WalletDepositBody, WalletHeader } from 'src/mobile/components';

const WalletDeposit: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const { currency } = useParams<{ currency?: string }>();
  const wallet = useSelector(selectWallet(currency));

  useCurrenciesFetch();
  useWalletsFetch();
  useRangerConnectFetch();
  useMemberLevelFetch();

  const handleGenerateAddress = () => {
    if (wallet && currency && !wallet.deposit_address && wallet.type !== 'fiat') {
      dispatch(walletsAddressFetch({ currency }));
      dispatch(walletsFetch());
    }
  };

  return (
    <React.Fragment>
      <Subheader
        title={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
        backTitle={intl.formatMessage({ id: 'page.body.wallets.balance' })}
        onGoBack={() => history.push(`/wallets/${currency}/history`)}
      />
      {wallet && (
        <>
          <WalletHeader
            currency={wallet.currency.code}
            iconId={wallet.icon_id}
            name={wallet.name}
          />
          <WalletDepositBody wallet={wallet} handleGenerateAddress={handleGenerateAddress} />
        </>
      )}
    </React.Fragment>
  );
};

export { WalletDeposit };
