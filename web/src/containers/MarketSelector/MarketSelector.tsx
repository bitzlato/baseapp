import React, { FC, useRef, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    RootState,
    selectCurrentMarket,
    selectMarketSelectorState,
    toggleMarketSelector,
    selectMarkets,
    selectUserInfo,
    selectMarketTickers,
    setCurrentPrice,
    setCurrentMarket,
    depthFetch,
    Market,
} from 'src/modules';
import cn from 'classnames';
import { incrementalOrderBook } from 'src/api';
import { usePopoverClose } from 'src/hooks/usePopoverClose';

import s from './MarketSelector.postcss';
import { MarketSelectorToggler } from './MarketSelectorToggler/MarketSelectorToggler';
import { MarketSelectorTabs } from './MarketSelectorTabs/MarketSelectorTabs';
import { MarketSelectorItems } from './MarketSelectorItems/MarketSelectorItems';
import { MarketSelectorSearchInput } from './MarketSelectorSearchInput/MarketSelectorSearchInput';

const selector = (state: RootState) => ({
    isOpen: selectMarketSelectorState(state),
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
    user: selectUserInfo(state),
});

export const MarketSelector: FC = () => {
    const { isOpen, currentMarket, markets, marketTickers, user } = useSelector(selector);
    const dispatch = useDispatch();
    const wrapperRef = useRef<HTMLDivElement>();
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
    };

    const handleTogglerClick = () => {
        dispatch(toggleMarketSelector());
    };

    const handleOnOutsideClick = useCallback(() => {
        if (isOpen) {
            dispatch(toggleMarketSelector());
        }
    }, [isOpen]);

    const handleItemSelect = (market: Market) => {
        dispatch(setCurrentPrice(0));
        if (market) {
            dispatch(setCurrentMarket(market));
            if (!incrementalOrderBook()) {
                dispatch(depthFetch(market));
            }
            handleOnOutsideClick();
        }
    };

    usePopoverClose(wrapperRef, handleOnOutsideClick);

    const availableMarkets = useMemo(() => {
        const { role } = user;
        return role !== 'admin' && role !== 'superadmin'
            ? markets.filter(item => item && item.state !== 'hidden')
            : markets;
    }, [markets, user]);

    if (!currentMarket) {
        return null;
    }

    return (
        <div className={s.wrapper} ref={wrapperRef}>
            <MarketSelectorToggler market={currentMarket} active={isOpen} onClick={handleTogglerClick} />
            <div className={cn(s.marketSelector, isOpen && s.marketSelectorOpen)}>
                <MarketSelectorTabs
                    markets={availableMarkets}
                    searchValue={searchValue}
                    onSelect={handleSearchValueChange}
                    className={s.tabs}
                />
                <MarketSelectorItems
                    currentMarket={currentMarket}
                    markets={availableMarkets}
                    marketTickers={marketTickers}
                    searchValue={searchValue}
                    onItemSelect={handleItemSelect}
                />
                <MarketSelectorSearchInput value={searchValue} onChange={handleSearchValueChange} />
            </div>
        </div>
    );
};
