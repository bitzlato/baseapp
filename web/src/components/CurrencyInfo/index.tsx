import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Wallet } from 'src/modules';
import { Money } from '@trzmaxim/money';

export interface CurrencyInfoProps {
  wallet: Wallet;
}

export const CurrencyInfo: FC<CurrencyInfoProps> = ({
  wallet: { balance, locked, currency, iconUrl, icon_id },
}) => {
  const zeroMoney = Money.fromDecimal(0, currency);
  const balanceMoney = balance ?? zeroMoney;
  const lockedMoney = locked ?? zeroMoney;

  return (
    <div className="cr-wallet-item__single">
      <CryptoCurrencyIcon icon={iconUrl} currency={currency.code} iconId={icon_id} />
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
            <CurrencyTicker symbol={currency.code} />
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
