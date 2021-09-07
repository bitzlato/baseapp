import React, { FC } from 'react';
import cn from 'classnames';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';

import s from './MarketSelectorTab.postcss';

interface Props {
    children: string;
    currency: string;
    active?: boolean;
    onClick: (carrency: string) => void;
}

export const MarketSelectorTab: FC<Props> = ({ children, currency, active, onClick }: Props) => {
    const handleClick = () => onClick(currency);

    return (
        <button className={cn(s.tab, active && s.tabActive)} type="button" onClick={handleClick}>
            <CurrencyTicker symbol={children} />
        </button>
    );
};
