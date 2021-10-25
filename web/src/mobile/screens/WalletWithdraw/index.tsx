import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useMemberLevelFetch } from 'src/hooks/useMemberLevelsFetch';
import { useWalletsFetch } from 'src/hooks';
import { selectWallet } from 'src/modules/user/wallets';
import { Subheader, WalletBanner, WalletHeader, WalletWithdrawBody } from 'src/mobile/components';

const WalletWithdraw: React.FC = () => {
  const { currency } = useParams<{ currency?: string }>();
  const intl = useIntl();
  const history = useHistory();
  const wallet = useSelector(selectWallet(currency));

  useWalletsFetch();
  useMemberLevelFetch();

  return (
    <div className="cr-mobile-wallet-withdraw">
      <Subheader
        title={intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' })}
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
          <WalletBanner wallet={wallet} />
          <WalletWithdrawBody wallet={wallet} />
        </>
      )}
    </div>
  );
};

export { WalletWithdraw };
