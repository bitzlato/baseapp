import { Money, Currency } from '@bitzlato/money-js';
import { P2PCryptoCurrencySource } from 'web/src/modules/p2p/wallet-types';
import { CurrencySource } from 'web/src/modules/public/currencies/types';

export interface BaseCurrency extends Currency {
  name: string;
  sign: string;
}

// Market cryptocurrency from peatio
export interface BlockchainCurrencyMoney {
  blockchain_id: number;
  min_deposit_amount: Money;
  withdraw_fee: Money;
}

interface MarketCurrencyOverride {
  deposit_fee: Money;
  min_withdraw_amount: Money;
  blockchain_currencies: BlockchainCurrencyMoney[];
}

export interface MarketCurrency extends BaseCurrency {
  apiCurrency?:
    | (Omit<CurrencySource, keyof MarketCurrencyOverride> & MarketCurrencyOverride)
    | undefined;
}

export type MarketCurrencies = Record<string, MarketCurrency>;

// Fiat currency from P2P
export interface P2PFiatCurrency extends BaseCurrency {}

export type P2PFiatCurrencies = Record<string, P2PFiatCurrency>;

// Cryptocurrency from P2P
interface P2PCryptoCurrencyOverride {
  minWithdrawal: Money;
  minAcceptableDeposit: Money;
}

export interface P2PCryptoCurrency extends BaseCurrency {
  apiCurrency?:
    | (Omit<P2PCryptoCurrencySource, keyof P2PCryptoCurrencyOverride> & P2PCryptoCurrencyOverride)
    | undefined;
}

export type P2PCryptoCurrencies = Record<string, P2PFiatCurrency>;
