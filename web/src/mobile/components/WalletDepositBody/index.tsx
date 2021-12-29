import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Box } from 'src/components/Box';
import { selectMemberLevels, Wallet } from 'src/modules';
import { Blur } from 'src/components/Blur';
import { CurrencyInfo } from 'src/components/CurrencyInfo';
import { DepositCrypto } from 'src/components/DepositCrypto';
import { DepositFiat } from 'src/components/DepositFiat';
import { selectUserInfo } from 'src/modules/user/profile';

interface Props {
  wallet: Wallet;
}

const WalletDepositBodyComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const user = useSelector(selectUserInfo);
  const memberLevels = useSelector(selectMemberLevels);

  const renderDepositBlur = React.useMemo(() => {
    const { wallet } = props;
    const isAccountActivated = wallet.type === 'fiat' || wallet.balance;

    const blurClassName = classnames(`pg-blur-deposit-${wallet.type}`, {
      'pg-blur-deposit-coin--active': isAccountActivated && wallet.type === 'coin',
      'pg-blur-deposit-fiat--active': isAccountActivated && wallet.type === 'fiat',
    });

    if (!wallet.deposit_enabled) {
      return (
        <Blur
          className={blurClassName}
          text={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.disabled.message' })}
        />
      );
    }

    if (user.level < (memberLevels?.deposit.minimum_level ?? 0)) {
      return (
        <Blur
          className={blurClassName}
          text={intl.formatMessage({ id: 'page.body.wallets.warning.deposit.verification' })}
          onClick={() => history.push('/confirm')}
          linkText={intl.formatMessage({
            id: 'page.body.wallets.warning.deposit.verification.button',
          })}
        />
      );
    }

    return null;
  }, [props.wallet, user, memberLevels]);

  const renderDeposit = () => {
    const { wallet } = props;

    const selectedWalletAddress = '';

    const title = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.fiat.message1' });
    const description = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.fiat.message2' });

    if (wallet.type === 'coin') {
      return (
        <React.Fragment>
          <CurrencyInfo wallet={wallet} />
          {renderDepositBlur}
          <Box padding="2">
            <DepositCrypto wallet={wallet} />
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CurrencyInfo wallet={wallet} />
          {renderDepositBlur}
          <DepositFiat title={title} description={description} uid={user ? user.uid : ''} />
        </React.Fragment>
      );
    }
  };

  return <div className="cr-mobile-wallet-deposit-body">{renderDeposit()}</div>;
};

const WalletDepositBody = React.memo(WalletDepositBodyComponent);

export { WalletDepositBody };
