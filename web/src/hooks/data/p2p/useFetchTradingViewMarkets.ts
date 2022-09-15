import { p2pUrl } from 'web/src/api/config';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { P2PMarketSymbol } from 'web/src/types/tradingView.types';

export const useFetchTradingViewMarkets = () =>
  useFetch<ReadonlyArray<P2PMarketSymbol>>(`${p2pUrl()}/public/trading-view/market-symbols`);
