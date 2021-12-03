import type { Currency } from '@bitzlato/money-js';
import type { Market, Wallet } from '../../modules';

interface SwapState {
  fromCurrencies: string[];
  toCurrencies: string[];
  market?: Market;
  fromCcy?: Currency;
  toCcy?: Currency;
}

export function getCurrency(code: Currency['code'], minorUnit: Currency['minorUnit']) {
  return {
    code,
    minorUnit,
  };
}

export function getCurrencies(markets: Market[], base: string, quote: string): SwapState {
  const bases = new Set<string>();
  const quotes = new Set<string>();
  let market: Market | undefined;
  let fromCcy: Currency | undefined;
  let toCcy: Currency | undefined;

  for (let m of markets) {
    const sell = m.base_unit === base && m.quote_unit === quote;
    if (sell || (m.base_unit === quote && m.quote_unit === base)) {
      market = m;
      if (sell) {
        fromCcy = getCurrency(m.base_unit, m.amount_precision);
        toCcy = getCurrency(m.quote_unit, m.price_precision);
      } else {
        fromCcy = getCurrency(m.quote_unit, m.price_precision);
        toCcy = getCurrency(m.base_unit, m.amount_precision);
      }
    }

    if (m.base_unit === base) {
      quotes.add(m.quote_unit);
    } else if (m.quote_unit === base) {
      quotes.add(m.base_unit);
    } else {
      quotes.add(m.base_unit);
      quotes.add(m.quote_unit);
    }

    if (m.base_unit === quote) {
      bases.add(m.quote_unit);
    } else if (m.quote_unit === quote) {
      bases.add(m.base_unit);
    } else {
      bases.add(m.base_unit);
      bases.add(m.quote_unit);
    }
  }

  return {
    fromCurrencies: [...bases],
    toCurrencies: [...quotes],
    market,
    fromCcy,
    toCcy,
  };
}

export function getWallet(currency: string, wallets: Wallet[]): Wallet | undefined {
  const lowerCurrency = currency.toLowerCase();
  return wallets.find((w) => w.currency.code.toLowerCase() === lowerCurrency);
}
