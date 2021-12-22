export interface TradingFee {
  id: number;
  group: 'any' | 'market-makers' | 'vip-0' | 'vip-1' | 'vip-2' | 'vip-3';
  maker: string;
  market_id: string;
  market_type: 'spot';
  taker: string;
  created_at: string;
  updated_at: string;
}
