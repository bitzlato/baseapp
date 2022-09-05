// import { p2pUrl } from 'web/src/api/config';
// import { useFetch } from 'web/src/hooks/data/useFetch';
// import { P2PMarketSymbol } from 'web/src/types/tradingView.types';

const MARKETS = [
  {
    symbol: 'btc_rub-sberbank',
    ccCode: 'BTC',
    currency: 'RUB',
    description: 'Sberbank',
  },
  {
    symbol: 'btc_rub-qiwi',
    ccCode: 'BTC',
    currency: 'RUB',
    description: 'QIWI',
  },
  {
    symbol: 'btc_rub-tinkoff',
    ccCode: 'BTC',
    currency: 'RUB',
    description: 'Tinkoff',
  },
];

export const useFetchTradingViewMarkets = () => ({ data: MARKETS, error: undefined });
// useFetch<ReadonlyArray<P2PMarketSymbol>>(`${p2pUrl()}/public/trading-view/market-symbols`);
