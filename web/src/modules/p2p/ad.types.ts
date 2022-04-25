import { Money } from '@bitzlato/money-js';
import { MoneyCurrency } from 'web/src/types';

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
  paymethod: number;
  lang: string;
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
