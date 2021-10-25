import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useWalletsFetch } from 'src/hooks';
import { selectWallet } from 'src/modules/user/wallets';
import { Subheader, WalletBanner, WalletHeader, WalletsButtons } from 'src/mobile/components';
import { WalletsHistory } from 'src/mobile/screens/WalletsHistory';

const SelectedWalletMobileScreen = () => {
  const { currency } = useParams<{ currency?: string }>();
  const intl = useIntl();
  const history = useHistory();
  const wallet = useSelector(selectWallet(currency));

  useWalletsFetch();

  return (
    <React.Fragment>
      <Subheader
        title={intl.formatMessage({ id: 'page.body.wallets.balance' })}
        backTitle={intl.formatMessage({ id: 'page.mobile.wallets.title' })}
        onGoBack={() => history.push('/wallets')}
      />
      {wallet && (
        <>
          <WalletHeader
            currency={wallet.currency.code}
            iconId={wallet.icon_id}
            name={wallet.name}
          />
          <WalletBanner wallet={wallet} />
          <WalletsHistory />
          <WalletsButtons currency={wallet.currency} />
        </>
      )}
    </React.Fragment>
  );
};

export { SelectedWalletMobileScreen };
