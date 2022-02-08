import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket, selectMarketTickers, RootState } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import cn from 'classnames';
import { createMoney } from 'src/helpers/money';
import { HeaderToolbarItem } from './HeaderToolbarItem';

import s from './HeaderToolbar.postcss';

interface Props {
  className?: string;
}

const select = (state: RootState) => {
  const marketTickers = selectMarketTickers(state);
  const currentMarket = selectCurrentMarket(state);
  const ticker = currentMarket ? marketTickers[currentMarket.id] : undefined;
  const currency = currentMarket
    ? {
        code: currentMarket.quote_unit,
        minorUnit: currentMarket.price_precision,
      }
    : undefined;

  return {
    isLoading: state.public.markets.tickerLoading,
    low: ticker && currency ? createMoney(ticker.low, currency) : undefined,
    last: ticker && currency ? createMoney(ticker.last, currency) : undefined,
    high: ticker && currency ? createMoney(ticker.high, currency) : undefined,
    volume: ticker && currency ? createMoney(ticker.volume, currency) : undefined,
    change: ticker ? ticker.price_change_percent : undefined,
  };
};

export const HeaderToolbar: FC<Props> = ({ className }) => {
  const { low, last, high, volume, change, isLoading } = useSelector(select);
  const t = useT();

  return (
    <div className={cn(s.toolbar, className)}>
      <HeaderToolbarItem
        color="positive"
        label={t('page.body.trade.toolBar.lowest')}
        isLoading={isLoading}
      >
        {low && <AmountFormat money={low} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="negative"
        label={t('page.body.trade.toolBar.lastPrice')}
        isLoading={isLoading}
      >
        {last && <AmountFormat money={last} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="negative"
        label={t('page.body.trade.toolBar.highest')}
        isLoading={isLoading}
      >
        {high && <AmountFormat money={high} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color="positive"
        label={t('page.body.trade.toolBar.volume')}
        isLoading={isLoading}
      >
        {volume && <AmountFormat money={volume} />}
      </HeaderToolbarItem>
      <HeaderToolbarItem
        color={change?.startsWith('+') ? 'positive' : 'negative'}
        label={t('page.body.trade.toolBar.change')}
        isLoading={isLoading}
      >
        {change}
      </HeaderToolbarItem>
    </div>
  );
};
