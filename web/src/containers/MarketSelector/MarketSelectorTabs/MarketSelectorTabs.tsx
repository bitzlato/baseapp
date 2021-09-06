import React, { FC, useMemo, useState } from 'react';

import s from './MarketSelectorTabs.postcss';
import { Market } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { MarketSelectorTab } from './MarketSelectorTab';
import { MarketSelectorTabsDropdown } from './MarketSelectorTabsDropdown';

interface Props {
    markets: readonly Market[];
    searchValue: string;
    onSelect: (value: string) => void;
}

const ITEM_ALL = 'ALL' as const;

export const MarketSelectorTabs: FC<Props> = ({ markets, searchValue, onSelect }: Props) => {
    const t = useT();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currencies = useMemo((): readonly string[] => {
        return Array.from(new Set(markets.reduce((acc, market) => [...acc, ...market.name.split('/')], [])));
    }, [markets]);
    const primary = currencies.slice(0, 3);
    const secondary = currencies.slice(3);
    const searchValueUpperCase = searchValue.toUpperCase();

    const handleTabClick = (currency: string) => {
        setIsDropdownOpen(false);

        if (currency === ITEM_ALL) {
            onSelect('');
            return;
        }

        onSelect(currency);
    };

    const handleTogglerClick = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className={s.tabs}>
            <MarketSelectorTab currency={ITEM_ALL} active={searchValue === ''} onClick={handleTabClick}>
                {t('page.body.openOrders.tab.all')}
            </MarketSelectorTab>
            {primary.map(currency => (
                <MarketSelectorTab
                    key={currency}
                    currency={currency}
                    active={currency === searchValueUpperCase}
                    onClick={handleTabClick}
                >
                    {currency.toUpperCase()}
                </MarketSelectorTab>
            ))}
            {secondary.length > 0 && (
                <MarketSelectorTabsDropdown opened={isDropdownOpen} onTogglerClick={handleTogglerClick}>
                    {secondary.map(currency => (
                        <MarketSelectorTab
                            key={currency}
                            currency={currency}
                            active={currency === searchValueUpperCase}
                            onClick={handleTabClick}
                        >
                            {currency.toUpperCase()}
                        </MarketSelectorTab>
                    ))}
                </MarketSelectorTabsDropdown>
            )}
        </div>
    );
};
