import React, { FC } from 'react';

import s from './CurrencyTicker.postcss';

type Props = {
    symbol: string;
};

export const CurrencyTicker: FC<Props> = ({ symbol }: Props) => {
    const hasNetwork = symbol.includes('-');
    if (!hasNetwork) {
        return <span className={s.currency}>{symbol.toUpperCase()}</span>;
    }
    const [currency, network] = symbol.split('-');
    return (
        <span className={s.currencyWithNetwork}>
            <span>{currency.toUpperCase()}</span>
            <span className={s.network}>{network.toUpperCase()}</span>
        </span>
    );
};
