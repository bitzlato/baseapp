import React, { FC } from 'react';
import cn from 'classnames';
import { Wallet } from 'src/modules';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { LockIcon } from 'src/assets/icons/LockIcon';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';

import s from './WalletItem.postcss';
import { Money } from '@bitzlato/money-js';

interface Props {
  active?: boolean;
  wallet: Wallet;
  onClick?: () => void;
}

export const WalletItem: FC<Props> = ({
  wallet: { name, balance, locked, iconUrl, icon_id: iconId, currency },
  active = false,
  onClick,
}: Props) => {
  const zeroMoney = Money.fromDecimal(0, currency);
  const hasLocked = locked?.gt(zeroMoney) === true;
  const currencySymbol = currency.code.split('-')[0];

  return (
    <button className={cn(s.item, active && s.itemActive)} type="button" onClick={onClick}>
      <span className={s.icon}>
        <CryptoCurrencyIcon currency={currency.code} iconId={iconId} icon={iconUrl} />
      </span>
      <span className={s.info}>
        <span className={cn(s.row, s.title)}>
          <span>{currencySymbol}</span>
          <span>
            <AmountFormat money={balance ?? zeroMoney} />
          </span>
        </span>
        <span className={cn(s.row, s.description)}>
          <span>{name}</span>
          {hasLocked && (
            <span className={s.amountLocked}>
              <LockIcon /> <AmountFormat money={locked} />
            </span>
          )}
        </span>
      </span>
    </button>
  );
};
