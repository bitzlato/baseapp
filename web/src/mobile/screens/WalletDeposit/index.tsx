import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useMemberLevelFetch } from 'src/hooks/useMemberLevelsFetch';
import { useCurrenciesFetch, useRangerConnectFetch, useWalletsFetch } from 'src/hooks';
import { selectWallet } from 'src/modules/user/wallets';
import { Subheader, WalletDepositBody, WalletHeader } from 'src/mobile/components';

const WalletDeposit: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const { currency } = useParams<{ currency?: string }>();
  const wallet = useSelector(selectWallet(currency));

  useCurrenciesFetch();
  useWalletsFetch();
  useRangerConnectFetch();
  useMemberLevelFetch();

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
          <WalletDepositBody wallet={wallet} />
        </>
      )}
    </React.Fragment>
  );
};

export { WalletDeposit };
