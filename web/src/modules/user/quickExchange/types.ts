export interface QuickExchangeCreate {
  created_at: string;
  id: number;
  market: string;
  price: string;
  remaining_volume: string;
  state: 'wait' | 'done' | 'cancel';
  updated_at: string;
}

export interface QuickExchangeStatus {
  id: number;
  price: number;
  state: 'wait' | 'done' | 'cancel';
  market: string;
  created_at: string;
  updated_at: string;
  remaining_volume: number;
}
