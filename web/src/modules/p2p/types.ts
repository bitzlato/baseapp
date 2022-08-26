import { Money } from '@bitzlato/money-js';
import { BaseCurrency } from 'web/src/types/currencies.types';
import { P2PVoucherLink } from 'web/src/modules/account/voucher-types';

export interface CurrencyRate {
  description: string;
  url: string;
  id: number;
  rate: number;
}

export interface CurrencyRateByParams {
  currency: string;
  percent: string;
  value: string;
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
  paymethodSlug?: string | undefined;
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
  slug: string | undefined;
}

export interface PaymethodInfo {
  id: number;
  count: number;
  description: string;
  slug: string;
  rate: number;
}

export interface PaymethodsParams {
  type: AdvertType | undefined;
  currency?: string;
  cryptocurrency?: string;
  isOwnerVerificated?: boolean;
  isOwnerTrusted?: boolean;
  isOwnerActive?: boolean;
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
  unactiveReason:
    | 'not_enough_funds'
    | 'blacklisted'
    | 'partner_not_enough_funds'
    | 'verified_only'
    | 'trade_with_yourself'
    | 'blacklisted_by_you';
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
  currency: BaseCurrency;
  cryptoCurrency: BaseCurrency;
}

export interface PaymethodSource {
  id: number;
  currency: string;
  description: string;
}

export interface UserAdvertSource {
  balanceThreshold: number | null;
  cryptocurrency: string;
  deepLinkCode: string;
  details: string | null;
  disablePercent: number | null;
  id: number;
  links: P2PVoucherLink[];
  liquidityLimit: boolean;
  maxAmount: string;
  maxLimitForNewTrader: string | null;
  minAmount: string;
  minPartnerTradesAmount: string | null;
  ownerLastActivity: number;
  paymethod: number;
  paymethod_currency: string;
  paymethod_description: string;
  position: null;
  ratePercent: string;
  rateValue: string;
  status: 'active' | 'pause' | 'paused_automatically';
  terms: string | null;
  type: AdvertType;
  unactiveReason: string | null;
  verifiedOnly: boolean;
}

export interface UserAdvert extends UserAdvertSource {
  cryptoCurrency: BaseCurrency;
  rate: Money;
  limitCurrency: {
    min: Money;
    max: Money;
  };
}

export interface UserAdvertDetails extends Omit<UserAdvertSource, 'paymethod'> {
  cryptoCurrency: BaseCurrency;
  rate: Money;
  limitCurrency: {
    min: Money;
    max: Money;
  };
  paymethod: PaymethodSource;
}

export type TradeStatusSource = Record<string, boolean>;
