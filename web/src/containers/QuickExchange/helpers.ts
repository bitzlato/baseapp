import type { Currency } from '@bitzlato/money-js';
import { lowerBound } from 'src/helpers/lowerBound';
import type { Market, Wallet } from '../../modules';

export interface DropdownItem {
  code: string;
  match: boolean;
}

interface SwapState {
  fromList: DropdownItem[];
  toList: DropdownItem[];
  market?: Market;
}

export function getCurrencies(markets: Market[], base: string, quote: string): SwapState {
  let market: Market | undefined;
  const fromList: DropdownItem[] = [];
  const toList: DropdownItem[] = [];

  for (let m of markets) {
    const sell = m.base_unit === base && m.quote_unit === quote;
    if (sell || (m.base_unit === quote && m.quote_unit === base)) {
      market = m;
    }

    if (quote !== m.base_unit) insertUnique(fromList, m.base_unit, m.quote_unit === quote);
    if (quote !== m.quote_unit) insertUnique(fromList, m.quote_unit, m.base_unit === quote);

    if (base !== m.base_unit) insertUnique(toList, m.base_unit, m.quote_unit === base);
    if (base !== m.quote_unit) insertUnique(toList, m.quote_unit, m.base_unit === base);
  }

  fromList.sort(compareItems);
  toList.sort(compareItems);

  return {
    fromList,
    toList,
    market,
  };
}

function insertUnique(items: DropdownItem[], code: string, match: boolean) {
  const value = { code, match };
  const index = lowerBound(items, value, lessName);
  const found = index !== items.length && !lessName(value, items[index]);
  if (!found) {
    items.splice(index, 0, value);
  } else {
    const d = items[index];
    d.match ||= match;
  }
}

function lessName(a: DropdownItem, b: DropdownItem) {
  return a.code < b.code;
}

function compareItems(a: DropdownItem, b: DropdownItem): number {
  if (a.match !== b.match) {
    return Number(b.match) - Number(a.match);
  }
  return a.code === b.code ? 0 : a.code < b.code ? -1 : 1;
}

export function getWallet(currency: string, wallets: Wallet[]): Wallet | undefined {
  const lowerCurrency = currency.toLowerCase();
  return wallets.find((w) => w.currency.code.toLowerCase() === lowerCurrency);
}

export function getCurrency(code: Currency['code'], minorUnit: Currency['minorUnit']) {
  return {
    code,
    minorUnit,
  };
}

export function getItem(code: string, match: boolean): DropdownItem {
  return { code, match };
}
