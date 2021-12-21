import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Wallet } from 'src/modules';
import { createMoney } from 'src/helpers/money';

export interface CurrencyInfoProps {
  wallet: Wallet;
}

export const CurrencyInfo: FC<CurrencyInfoProps> = ({
  wallet: { balance, locked, currency, icon_url, icon_id },
}) => {
  const zeroMoney = createMoney(0, currency);
  const balanceMoney = balance ?? zeroMoney;
  const lockedMoney = locked ?? zeroMoney;

  return (
    <div className="cr-wallet-item__single">
      <CryptoCurrencyIcon icon={icon_url} currency={currency.code} iconId={icon_id} />
      <div className="cr-wallet-item__single-balance">
        <div>
          <div className="cr-wallet-item__amount-locked">
            <FormattedMessage id="page.body.wallets.locked" />
          </div>
          <span className="cr-wallet-item__balance-locked">
            <AmountFormat money={lockedMoney} />
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
            <AmountFormat money={balanceMoney} />
          </span>
        </div>
      </div>
    </div>
  );
};
