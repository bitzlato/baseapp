import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFetchTradingViewMarkets } from 'web/src/hooks/data/p2p/useFetchTradingViewMarkets';
import { selectMarkets, selectMarketsLoading } from 'web/src/modules/public/markets/selectors';
import { TradingViewMarketOption } from 'web/src/types/tradingView.types';

export const useTradingViewMarkets = (
  cryptoCurrencyCode?: string | undefined,
): Array<TradingViewMarketOption> | undefined => {
  const isMarketsLoading = useSelector(selectMarketsLoading);
  const exchangeMarkets = useSelector(selectMarkets);
  const { data: p2pMarkets, error } = useFetchTradingViewMarkets();

  const isLoading = isMarketsLoading && !p2pMarkets && !error;

  return useMemo(() => {
    if (isLoading) {
      return undefined;
    }

    const markets = exchangeMarkets?.reduce<Array<TradingViewMarketOption>>(
      (acc, exchangeMarket) => {
        acc.push({
          id: exchangeMarket.id,
          symbol: exchangeMarket.symbol,
          name: exchangeMarket.name,
          base_unit: exchangeMarket.base_unit.toUpperCase(),
          quote_unit: exchangeMarket.quote_unit.toUpperCase(),
          currencyCode: exchangeMarket.quote_unit.toUpperCase(),
          price_precision: exchangeMarket.price_precision,
          isExchange: true,
        });

        return acc;
      },
      [],
    );

    return (p2pMarkets ?? [])
      .reduce((acc, p2pMarket) => {
        acc.push({
          id: p2pMarket.symbol,
          symbol: p2pMarket.symbol,
          name: `${p2pMarket.ccCode}/${p2pMarket.description}`,
          base_unit: p2pMarket.ccCode,
          quote_unit: p2pMarket.currency,
          currencyCode: p2pMarket.currency,
          price_precision: 2,
          isExchange: false,
        });

        return acc;
      }, markets)
      .filter(
        (market) =>
          market.base_unit === cryptoCurrencyCode || market.quote_unit === cryptoCurrencyCode,
      );
  }, [cryptoCurrencyCode, exchangeMarkets, isLoading, p2pMarkets]);
};
