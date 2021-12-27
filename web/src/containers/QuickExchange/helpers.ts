import { lowerBound } from 'src/helpers/lowerBound';
import type { ApiCurrency, Market, Wallet } from '../../modules';

interface SwapState {
  fromList: string[];
  toList: string[];
  market?: Market;
  recommendTo?: string;
}

export function getCurrencies(markets: Market[], from: string, to: string): SwapState {
  let market: Market | undefined;
  const fromList: string[] = [];
  const toList: string[] = [];
  let recommendTo: string | undefined;

  for (let m of markets) {
    const sell = m.base_unit === from && m.quote_unit === to;
    if (sell || (m.base_unit === to && m.quote_unit === from)) {
      market = m;
    }

    insertUnique(fromList, m.base_unit);
    insertUnique(fromList, m.quote_unit);

    if (from === m.base_unit) insertUnique(toList, m.quote_unit);
    if (from === m.quote_unit) insertUnique(toList, m.base_unit);
  }

  if (!market && toList.length) {
    let index = toList.findIndex((d) => d.indexOf('usdt') !== -1);
    if (index !== -1) {
      recommendTo = toList[index];
    } else {
      index = toList.findIndex((d) => d.indexOf('usdc') !== -1);
      if (index !== -1) {
        recommendTo = toList[index];
      } else {
        recommendTo = toList[0];
      }
    }
  }

  return {
    fromList,
    toList,
    market,
    recommendTo,
  };
}

function insertUnique(items: string[], value: string) {
  const index = lowerBound(items, value, lessName);
  const found = index !== items.length && !lessName(value, items[index]);
  if (!found) {
    items.splice(index, 0, value);
  }
}

function lessName(a: string, b: string): boolean {
  return a < b;
}

export function getWallet(currency: string, wallets: Wallet[]): Wallet | undefined {
  const lowerCurrency = currency.toLowerCase();
  return wallets.find((w) => w.currency.code.toLowerCase() === lowerCurrency);
}

export function getCurrency(currency: string, currencies: ApiCurrency[]): ApiCurrency | undefined {
  const lowerCurrency = currency.toLowerCase();
  return currencies.find((d) => d.code.toLowerCase() === lowerCurrency);
}
