export interface CurrencyRate {
  description: string;
  url: string;
  id: number;
  rate: number;
}

export interface RateSourcesParams {
  cryptocurrency: string;
  currency: string;
  url: string;
}

type P2PTransactionType = 'load' | 'withdrawal';

export interface P2PTransactionsParams {
  cryptocurrency: string;
  skip: number;
  limit: number;
  sortKey: string;
  sortValue: 'desc' | 'asc';
  type: P2PTransactionType;
}

export interface P2PChangeTransactionParams {
  comment: string;
}

export interface P2PCryptoCurrency {
  code: string;
  amount: number;
}

export interface P2PTransaction {
  address: string;
  comment: string | null;
  created: number;
  cryptocurrency: P2PCryptoCurrency;
  id: number;
  type: P2PTransactionType;
  viewUrl: string;
}

export interface P2PList<T> {
  data: T[];
  total: number;
}
