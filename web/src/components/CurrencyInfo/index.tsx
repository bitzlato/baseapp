import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Wallet } from 'src/modules';

export interface CurrencyInfoProps {
  wallet: Wallet;
}

interface CurrencyIconProps {
  icon?: string | null;
  currency: string;
  iconId?: string;
}

export const CurrencyIcon: FC<CurrencyIconProps> = ({ currency, icon, iconId }) => {
  return icon ? (
    <img alt={currency} className="cr-wallet-item__single__image-icon" src={icon} />
  ) : (
    <CryptoCurrencyIcon currency={currency} iconId={iconId} />
  );
};

export const CurrencyInfo: FC<CurrencyInfoProps> = (props) => {
  const balance = props.wallet && props.wallet.balance ? props.wallet.balance.toString() : '0';
  const lockedAmount = props.wallet && props.wallet.locked ? props.wallet.locked.toString() : '0';
  const currency = (props.wallet || { currency: '' }).currency.toUpperCase();
  const selectedFixed = (props.wallet || { fixed: 0 }).fixed;
  const cryptoCurrency = {
    code: currency,
    minorUnit: selectedFixed,
  };

  const iconUrl = props.wallet ? props.wallet.iconUrl : null;
  const balanceMoney = {
    amount: balance,
    currency: cryptoCurrency,
  };
  const lockedMoney = {
    amount: lockedAmount,
    currency: cryptoCurrency,
  };

  return (
    <div className="cr-wallet-item__single">
      <CurrencyIcon icon={iconUrl} currency={props.wallet.currency} iconId={props.wallet.icon_id} />
      <div className="cr-wallet-item__single-balance">
        <div>
          <div className="cr-wallet-item__amount-locked">
            <FormattedMessage id="page.body.wallets.locked" />
          </div>
          <span className="cr-wallet-item__balance-locked">
            <MoneyFormat money={lockedMoney} />
          </span>
        </div>
        <div>
          <span className="cr-wallet-item__balance">
            <CurrencyTicker symbol={currency} />
            &nbsp;
            <FormattedMessage id="page.body.wallets.balance" />
          </span>
          &nbsp;
          <span className="cr-wallet-item__balance-amount">
            <MoneyFormat money={balanceMoney} />
          </span>
        </div>
      </div>
    </div>
  );
};
