import { Money } from '@bitzlato/money-js';
import { P2PWallet } from 'web/src/modules/p2p/wallet-types';
import { AccountBalanceSource } from 'web/src/modules/public/accounts/types';
import {
  BaseCurrency,
  MarketCurrency,
  P2PCryptoCurrency,
  P2PFiatCurrency,
} from 'web/src/types/currencies.types';

interface MarketBalanceOverride {
  currency: MarketCurrency;
  balance: Money;
  locked: Money;
  limit_24_hour: Money;
  limit_1_month: Money;
}

export interface MarketBalance
  extends Omit<AccountBalanceSource, keyof MarketBalanceOverride>,
    MarketBalanceOverride {}

export interface P2PBalanceOverride {
  cryptocurrency: P2PCryptoCurrency;
  balance: Money;
  holdBalance: Money;
  worth: {
    currency: P2PFiatCurrency;
    value: Money;
    holdValue: Money;
  };
}

export interface P2PBalance extends Omit<P2PWallet, keyof P2PBalanceOverride>, P2PBalanceOverride {}

export interface Balance {
  name: string;
  cryptoCurrency: BaseCurrency;
  marketCurrency?: MarketCurrency | undefined;
  p2pCryptoCurrency?: P2PCryptoCurrency | undefined;
  totalBalance?: Money | undefined;
  totalBalanceInFiat?: Money | undefined;
  marketBalance?: MarketBalance | undefined;
  p2pBalance?: P2PBalance | undefined;
  features: {
    transfer: boolean;
    gift: boolean;
    changeRate: boolean;
  };
}
