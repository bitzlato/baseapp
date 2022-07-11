export interface Blockchain {
  explorer_address?: string | null;
  explorer_transaction?: string | null;
  height?: number | null;
  id: number;
  is_transaction_price_too_high: boolean;
  key: string;
  min_confirmations: number;
  name: string;
  status: 'disabled' | 'active';
}
