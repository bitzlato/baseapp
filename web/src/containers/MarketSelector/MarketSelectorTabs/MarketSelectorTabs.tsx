import React, { FC, useMemo, useState } from 'react';
import cn from 'classnames';

import s from './MarketSelectorTabs.postcss';
import { Market } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { MarketSelectorTabsDropdown } from './MarketSelectorTabsDropdown';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { Tabs, TabList, Tab } from 'src/components/Tabs';

interface Props {
    markets: readonly Market[];
    searchValue: string;
    onSelect: (value: string) => void;
    className?: string;
}

const ITEM_ALL = 'ALL' as const;

export const MarketSelectorTabs: FC<Props> = ({ markets, searchValue, onSelect, className }: Props) => {
    const t = useT();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currencies = useMemo((): readonly string[] => {
        return Array.from(new Set(markets.reduce((acc, market) => [...acc, ...market.name.split('/')], [])));
    }, [markets]);
    const primary = currencies.slice(0, 3);
    const secondary = currencies.slice(3);
    const searchValueUpperCase = searchValue.toUpperCase();

    const handleSelectionChange = (currency: string) => {
        setIsDropdownOpen(false);

        if (currency === ITEM_ALL) {
            onSelect('');
            return;
        }

        onSelect(currency);
    };

    const handleTogglerClick = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <Tabs
            value={searchValueUpperCase === '' ? ITEM_ALL : searchValueUpperCase}
            onSelectionChange={handleSelectionChange}
        >
            <TabList className={cn(s.tabs, className)}>
                <Tab className={s.tab} size="small" value={ITEM_ALL}>
                    {t('page.body.openOrders.tab.all')}
                </Tab>
                {primary.map(currency => (
                    <Tab key={currency} className={s.tab} size="small" value={currency}>
                        <CurrencyTicker symbol={currency.toUpperCase()} />
                    </Tab>
                ))}
                {secondary.length > 0 && (
                    <MarketSelectorTabsDropdown opened={isDropdownOpen} onTogglerClick={handleTogglerClick}>
                        {secondary.map(currency => (
                            <Tab key={currency} className={s.tab} size="small" value={currency}>
                                <CurrencyTicker symbol={currency.toUpperCase()} />
                            </Tab>
                        ))}
                    </MarketSelectorTabsDropdown>
                )}
            </TabList>
        </Tabs>
    );
};
