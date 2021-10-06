import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { formatCCYAddress } from 'src/helpers';
import { selectMemberLevels, Wallet } from 'src/modules';
import { defaultCurrency } from 'src/modules/public/currencies/defaults';
import { Blur } from '../../../components/Blur';
import { CurrencyInfo } from '../../../components/CurrencyInfo';
import { DepositCrypto } from '../../../components/DepositCrypto';
import { DepositFiat } from '../../../components/DepositFiat';
import { selectCurrencies } from '../../../modules/public/currencies';
import { selectUserInfo } from '../../../modules/user/profile';

interface Props {
  wallet: Wallet;
  handleGenerateAddress: () => void;
}

const WalletDepositBodyComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const currencies = useSelector(selectCurrencies);
  const user = useSelector(selectUserInfo);
  const memberLevels = useSelector(selectMemberLevels);
  const label = React.useMemo(
    () => intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.address' }),
    [intl],
  );

  const handleOnCopy = () => ({});

  const renderDepositBlur = React.useMemo(() => {
    const { wallet } = props;
    const isAccountActivated = wallet.type === 'fiat' || wallet.balance;
    const currencyItem = (currencies && currencies.find((item) => item.id === wallet.currency)) || {
      min_confirmations: 6,
      deposit_enabled: false,
    };

    const blurClassName = classnames(`pg-blur-deposit-${wallet.type}`, {
      'pg-blur-deposit-coin--active': isAccountActivated && wallet.type === 'coin',
      'pg-blur-deposit-fiat--active': isAccountActivated && wallet.type === 'fiat',
    });

    if (!currencyItem?.deposit_enabled) {
      return (
        <Blur
          className={blurClassName}
          text={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.disabled.message' })}
        />
      );
    }

    if (user.level < memberLevels?.deposit.minimum_level) {
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
  }, [props.wallet, currencies, user, memberLevels]);

  const renderDeposit = () => {
    const { wallet } = props;
    const currencyItem = currencies.find((item) => item.id === wallet.currency);
    const error = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.pending' });

    const selectedWalletAddress = '';

    const walletAddress = formatCCYAddress(wallet.currency, selectedWalletAddress) || '';

    const title = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.fiat.message1' });
    const description = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.fiat.message2' });

    if (wallet.type === 'coin') {
      return (
        <React.Fragment>
          <CurrencyInfo wallet={wallet} />
          {renderDepositBlur}
          <DepositCrypto
            copiableTextFieldText={`${wallet.currency.toUpperCase()} ${label}`}
            error={error}
            handleGenerateAddress={props.handleGenerateAddress}
            handleOnCopy={handleOnCopy}
            wallet={wallet}
            currency={currencyItem || defaultCurrency}
            disabled={!walletAddress}
          />
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
