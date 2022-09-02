import { TradingViewMarket } from 'web/src/containers/TradingChart/api';

export interface P2PMarketSymbol {
  symbol: string;
  ccCode: string;
  currency: string;
  description: string;
}

export interface TradingViewMarketOption extends TradingViewMarket {
  symbol: string;
  base_unit: string;
  quote_unit: string;
  price_precision: number;
  currencyCode: string;
  isExchange: boolean;
}
