import { Money } from '@bitzlato/money-js';
import { MoneyCurrency } from 'web/src/types';

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

export interface P2PDepositTransaction extends P2PTransaction {
  type: 'load';
  status: 'success' | 'aml-seizure' | 'aml-check';
}

export interface P2PList<T> {
  data: T[];
  total: number;
}

export type SeoAdvertType = 'buy' | 'sell';
export type AdvertType = 'purchase' | 'selling';

export interface AdvertParams {
  limit: number;
  skip: number;
  type: AdvertType;
  currency: string;
  cryptocurrency: string;
  isOwnerVerificated: boolean;
  isOwnerTrusted: boolean;
  isOwnerActive: boolean;
  paymethod?: number | undefined;
  lang: string;
  amount?: string | undefined;
  amountType?: 'cryptocurrency' | 'currency' | undefined;
}

export interface AdvertLimit {
  min: string;
  max: string;
  realMax: null;
}

export interface Paymethod {
  id: number;
  name: string;
}

export interface PaymethodInfoSource {
  id: number;
  count: number;
  description: string;
  rate: number;
}

export interface PaymethodInfo {
  id: number;
  count: number;
  description: string;
  slug: string;
  rate: number;
}

export interface PaymethodsParams {
  type: AdvertType;
  currency: string;
  cryptocurrency: string;
  isOwnerVerificated: boolean;
  isOwnerTrusted: boolean;
  isOwnerActive: boolean;
  lang: string;
}

export interface AdvertSource {
  available: boolean;
  cryptocurrency: string;
  currency: string;
  id: number;
  isOwnerVerificated: boolean;
  limitCryptocurrency: AdvertLimit;
  limitCurrency: AdvertLimit;
  owner: string;
  ownerBalance: null;
  ownerLastActivity: number;
  ownerTrusted: boolean;
  paymethod: Paymethod;
  rate: string;
  safeMode: boolean;
  type: AdvertType;
  unactiveReason: null;
}

export interface AdvertSingleSource {
  available: boolean;
  cryptocurrency: string;
  deepLinkCode: string;
  details: null;
  id: number;
  limitCryptocurrency: AdvertLimit;
  limitCurrency: AdvertLimit;
  owner: string;
  paymethod: number;
  position: null;
  rate: string;
  status: 'active';
  terms: string;
  type: AdvertType;
  unactiveReason: 'not_enough_funds';
}

export interface PaymethodFull {
  currency: string;
  description: string;
  id: number;
}

export interface Advert
  extends Omit<
    AdvertSource,
    'rate' | 'limitCurrency' | 'limitCryptocurrency' | 'cryptocurrency' | 'currency'
  > {
  rate: Money;
  limitCurrency: {
    min: Money;
    max: Money;
    realMax?: Money | undefined;
  };
  limitCryptoCurrency: {
    min: Money;
    max: Money;
    realMax?: Money | undefined;
  };
  currency: MoneyCurrency;
  cryptoCurrency: MoneyCurrency;
}

export interface TradeSource {
  id: number;
  currency: P2PCryptoCurrency;
  cryptocurrency: P2PCryptoCurrency;
  rate: string;
  partner: string;
  type: 'selling' | 'purchase';
  paymethod: number;
  status: 'cancel' | 'confirm_payment' | 'confirm_trade' | 'dispute' | 'payment' | 'trade_created';
  date: number;
}

export interface Trade extends Omit<TradeSource, 'currency' | 'cryptocurrency'> {
  currency: P2PCryptoCurrency & { moneyCurrency: MoneyCurrency };
  cryptoCurrency: P2PCryptoCurrency & { moneyCurrency: MoneyCurrency };
}
