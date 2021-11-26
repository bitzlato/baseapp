import { Currency } from '@bitzlato/money-js';
import { fromDecimalSilent } from 'src/helpers/fromDecimal';
import { Market, Wallet } from '../../modules';

interface SwapState {
  bases: string[];
  quotes: string[];
  market?: Market;
  baseCcy?: Currency;
  quoteCcy?: Currency;
}

function getCurrency(code: Currency['code'], minorUnit: Currency['minorUnit']) {
  return {
    code,
    minorUnit,
  };
}

export function getCurrencies(markets: Market[], base: string, quote: string): SwapState {
  const bases = new Set<string>();
  const quotes = new Set<string>();
  let market: Market | undefined;
  let baseCcy: Currency | undefined;
  let quoteCcy: Currency | undefined;

  for (let m of markets) {
    const sell = m.base_unit === base && m.quote_unit === quote;
    if (sell || (m.base_unit === quote && m.quote_unit === base)) {
      market = m;
      if (sell) {
        baseCcy = getCurrency(m.base_unit, m.amount_precision);
        quoteCcy = getCurrency(m.quote_unit, m.price_precision);
      } else {
        baseCcy = getCurrency(m.quote_unit, m.price_precision);
        quoteCcy = getCurrency(m.base_unit, m.amount_precision);
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
    bases: [...bases],
    quotes: [...quotes],
    market,
    baseCcy,
    quoteCcy,
  };
}

export function getWallet(currency: string, wallets: Wallet[]): Wallet | undefined {
  const lowerCurrency = currency.toLowerCase();
  return wallets.find((w) => w.currency.code.toLowerCase() === lowerCurrency);
}

export function calcQuoteAmount(baseAmount: string, quoteCcy: Currency, price: string): string {
  try {
    return fromDecimalSilent(baseAmount, quoteCcy).multiply(price).toFormat();
  } catch (e) {
    return '';
  }
}

export function calcBaseAmount(quoteAmount: string, baseCcy: Currency, price: string): string {
  try {
    return fromDecimalSilent(quoteAmount, baseCcy).divide(price).toFormat();
  } catch (error) {
    return '';
  }
}
