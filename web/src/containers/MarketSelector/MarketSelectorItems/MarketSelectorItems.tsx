import React, { FC, useMemo, useState } from 'react';
import cn from 'classnames';
import { Market, Ticker } from 'src/modules';
import { Decimal, Table } from 'src/components';

import s from './MarketSelectorItems.postcss';
import { useT } from 'src/hooks/useT';
import { SortIcon } from 'src/components/SortIcon/SortIcon';

interface Props {
    currentMarket?: Market | undefined;
    markets: readonly Market[];
    marketTickers: Record<string, Ticker>;
    searchValue: string;
    onItemSelect: (market: Market) => void;
}

interface SortState {
    sortBy: string;
    reversed: boolean;
}

interface Item extends Market {
    last: number;
    volume: number;
    price_change_percent: string;
    price_change_percent_num: number;
}

const initialSortState: SortState = {
    sortBy: 'none',
    reversed: false,
};

const defaultTicker: {
    last: string;
    volume: string;
    price_change_percent: string;
    price_change_percent_num: number;
} = {
    last: '0',
    volume: '0',
    price_change_percent: '+0.00%',
    price_change_percent_num: 0,
};

const headerCells = [
    { id: 'id', i18nKey: 'page.body.trade.header.markets.content.market' },
    { id: 'last', i18nKey: 'page.body.trade.header.markets.content.last_price' },
    { id: 'volume', i18nKey: 'page.body.trade.header.markets.content.volume' },
    { id: 'price_change_percent_num', i18nKey: 'page.body.trade.header.markets.content.change' },
];

export const MarketSelectorItems: FC<Props> = ({
    currentMarket,
    markets,
    marketTickers,
    searchValue,
    onItemSelect,
}: Props) => {
    const t = useT();
    const [{ sortBy, reversed }, setSort] = useState<SortState>(initialSortState);

    const handleHeaderClick = (headerId: string) => {
        setSort(prevState => {
            if (headerId !== prevState.sortBy) {
                return { sortBy: headerId, reversed: false };
            } else if (headerId === prevState.sortBy && !prevState.reversed) {
                return { ...prevState, reversed: true };
            }

            return { sortBy: 'none', reversed: false };
        });
    };

    const handleSelect = (marketName: string) => {
        const market = markets.find(el => el.name === marketName);

        onItemSelect(market);
    };

    const items: readonly Item[] = useMemo(() => {
        let result: Item[] = markets.map(market => {
            const { [market.id]: ticker = defaultTicker } = marketTickers;

            return {
                ...market,
                last: parseInt(ticker.last, 10),
                volume: parseInt(ticker.volume, 10),
                price_change_percent: ticker.price_change_percent,
                price_change_percent_num: Number.parseFloat(ticker.price_change_percent),
            };
        });

        if (sortBy !== 'none') {
            result.sort((a, b) => {
                const aValue = sortBy === 'id' ? a[sortBy] : parseInt(a[sortBy], 10);
                const bValue = sortBy === 'id' ? b[sortBy] : parseInt(b[sortBy], 10);

                if (aValue === bValue) {
                    return 0;
                }

                return aValue > bValue ? 1 : -1;
            });
        }

        if (reversed) {
            result.reverse();
        }

        if (searchValue !== '') {
            const searchValueLowerCase = searchValue.toLowerCase();
            result = result.filter(item =>
                item.name.split('/').some(namePart => namePart.toLowerCase().includes(searchValueLowerCase))
            );
        }

        return result;
    }, [markets, marketTickers, searchValue, sortBy, reversed]);

    const data: React.ReactNode[][] =
        items.length > 0
            ? items.map(item => {
                  const isPositive = /\+/.test(item.price_change_percent);
                  const cellClassName = cn({
                      [s.cellPositive]: isPositive,
                      [s.cellNegative]: !isPositive,
                  });

                  return [
                      item.name,
                      <span className={cellClassName}>
                          {Decimal.format(Number(item.last), item.price_precision, ',')}
                      </span>,
                      <span className={cellClassName}>
                          {Decimal.format(Number(item.volume), item.price_precision, ',')}
                      </span>,
                      <span className={cellClassName}>{item.price_change_percent}</span>,
                  ];
              })
            : [[]];
    const header = headerCells.map(cell => {
        const isSelected = cell.id === sortBy;
        const isReversed = isSelected && reversed;

        return (
            <button className={s.headerButton} key={cell.id} type="button" onClick={() => handleHeaderClick(cell.id)}>
                {t(cell.i18nKey)}
                <span className={s.sortIcon}>
                    <SortIcon selected={isSelected} reversed={isReversed} />
                </span>
            </button>
        );
    });

    return (
        <div className={s.items}>
            <Table
                data={data}
                header={header}
                onSelect={handleSelect}
                selectedKey={currentMarket?.name}
                rowKeyIndex={0}
            />
        </div>
    );
};
