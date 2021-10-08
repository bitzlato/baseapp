import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket, selectMarketTickers, RootState } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { MoneyFormat, money, ccy } from 'src/components/MoneyFormat/MoneyFormat';
import cn from 'classnames';

import s from './HeaderToolbar.postcss';
import { HeaderToolbarItem } from './HeaderToolbarItem';

interface Props {
  className?: string;
}

const select = (state: RootState) => {
  const marketTickers = selectMarketTickers(state);
  const currentMarket = selectCurrentMarket(state);

  return {
    currentMarket,
    ticker: currentMarket ? marketTickers[currentMarket.id] : undefined,
    isLoading: state.public.markets.tickerLoading,
  };
};

export const HeaderToolbar: FC<Props> = ({ className }) => {
  const { currentMarket, ticker, isLoading } = useSelector(select);
  const t = useT();
  const currency = currentMarket
    ? ccy(currentMarket.quote_unit, currentMarket.price_precision)
    : undefined;

  return (
    <div className={cn(s.toolbar, className)}>
      <HeaderToolbarItem
        color="positive"
        label={t('page.body.trade.toolBar.lowest')}
        isLoading={isLoading}
      >
        {ticker && currency && <MoneyFormat money={money(ticker.low, currency)} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="negative"
        label={t('page.body.trade.toolBar.lastPrice')}
        isLoading={isLoading}
      >
        {ticker && currency && <MoneyFormat money={money(ticker.last, currency)} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="negative"
        label={t('page.body.trade.toolBar.highest')}
        isLoading={isLoading}
      >
        {ticker && currency && <MoneyFormat money={money(ticker.high, currency)} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="positive"
        label={t('page.body.trade.toolBar.volume')}
        isLoading={isLoading}
      >
        {ticker && currency && <MoneyFormat money={money(ticker.volume, currency)} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color={ticker?.price_change_percent.startsWith('+') ? 'positive' : 'negative'}
        label={t('page.body.trade.toolBar.change')}
        isLoading={isLoading}
      >
        {ticker && ticker.price_change_percent}
      </HeaderToolbarItem>
    </div>
  );
};
