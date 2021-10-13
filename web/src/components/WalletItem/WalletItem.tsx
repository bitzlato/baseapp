import React, { FC } from 'react';
import cn from 'classnames';
import { Wallet } from 'src/modules';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { LockIcon } from 'src/assets/icons/LockIcon';
import { money, MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';

import s from './WalletItem.postcss';

interface Props {
  active?: boolean;
  wallet: Wallet;
  onClick?: () => void;
}

export const WalletItem: FC<Props> = ({
  wallet: { name, balance, locked, fixed, iconUrl, icon_id: iconId, currency },
  active = false,
  onClick,
}: Props) => {
  const hasLocked = parseFloat(locked ?? '0') > 0;
  const currencySymbol = currency.split('-')[0].toUpperCase();
  const cryptoCurrency = {
    code: currencySymbol,
    minorUnit: fixed,
  };

  return (
    <button className={cn(s.item, active && s.itemActive)} type="button" onClick={onClick}>
      <span className={s.icon}>
        <CryptoCurrencyIcon currency={currency.toLowerCase()} iconId={iconId} icon={iconUrl} />
      </span>
      <span className={s.info}>
        <span className={cn(s.row, s.title)}>
          <span>{currencySymbol}</span>
          <span>
            <MoneyFormat money={money(balance ?? 0, cryptoCurrency)} />
          </span>
        </span>
        <span className={cn(s.row, s.description)}>
          <span>{name}</span>
          {hasLocked && (
            <span className={s.amountLocked}>
              <LockIcon /> <MoneyFormat money={money(locked ?? 0, cryptoCurrency)} />
            </span>
          )}
        </span>
      </span>
    </button>
  );
};
