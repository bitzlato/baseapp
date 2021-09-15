import React, { FC } from 'react';
import cn from 'classnames';
import { Wallet } from 'src/modules';
import { CryptoCurrencyIcon } from 'src/components/CryptoCurrencyIcon/CryptoCurrencyIcon';
import { LockIcon } from 'src/assets/icons/LockIcon';
import { MoneyFormat } from 'src/components/MoneyFormat/MoneyFormat';

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
    const hasLocked = parseFloat(locked) > 0;
    const currencySymbol = currency.split('-')[0].toUpperCase();
    const cryptoCurrency = {
        code: currencySymbol,
        minorUnit: fixed,
    };
    const balanceMoney = {
        amount: balance,
        currency: cryptoCurrency,
    };
    const lockedMoney = {
        amount: locked,
        currency: cryptoCurrency,
    };

    return (
        <button className={cn(s.item, active && s.itemActive)} type="button" onClick={onClick}>
            <span className={s.icon}>
                {iconUrl ? (
                    <img alt={currency.toUpperCase()} src={iconUrl} />
                ) : (
                    <CryptoCurrencyIcon currency={currency.toLowerCase()} iconId={iconId} />
                )}
            </span>
            <span className={s.info}>
                <span className={cn(s.row, s.title)}>
                    <span>{currencySymbol}</span>
                    <span>
                        <MoneyFormat money={balanceMoney} />
                    </span>
                </span>
                <span className={cn(s.row, s.description)}>
                    <span>{name}</span>
                    {hasLocked && (
                        <span className={s.amountLocked}>
                            <LockIcon /> <MoneyFormat money={lockedMoney} />
                        </span>
                    )}
                </span>
            </span>
        </button>
    );
};
