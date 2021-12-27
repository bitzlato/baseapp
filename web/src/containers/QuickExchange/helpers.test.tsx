import { Market } from 'src/modules/public/markets/types';
import { getCurrencies } from './helpers';

function getMarketsLike(pairs: [string, string][]): Market[] {
  return pairs.map(([from, to]) => ({ base_unit: from, quote_unit: to } as Market));
}

const markets = getMarketsLike([
  ['btc', 'usdt'],
  ['eth', 'btc'],
  ['eth', 'mcr'],
]);

describe('getCurrencies', () => {
  test('should process bad "from"', () => {
    const d = getCurrencies(markets, '', '');
    expect(d.fromList).toEqual(['btc', 'eth', 'mcr', 'usdt']);
    expect(d.toList).toEqual([]);
    expect(d.market).toBeUndefined();
    expect(d.recommendTo).toBeUndefined();
  });

  test('should process bad "to"', () => {
    const d = getCurrencies(markets, 'btc', '');
    expect(d.fromList).toEqual(['btc', 'eth', 'mcr', 'usdt']);
    expect(d.toList).toEqual(['eth', 'usdt']);
    expect(d.market).toBeUndefined();
    expect(d.recommendTo).toBe('usdt');
  });

  test('should process bad "to" and without usdt market', () => {
    const d = getCurrencies(markets, 'eth', 'usdt2');
    expect(d.fromList).toEqual(['btc', 'eth', 'mcr', 'usdt']);
    expect(d.toList).toEqual(['btc', 'mcr']);
    expect(d.market).toBeUndefined();
    expect(d.recommendTo).toBe('btc');
  });

  test('should process existing market', () => {
    const d = getCurrencies(markets, 'btc', 'usdt');
    expect(d.fromList).toEqual(['btc', 'eth', 'mcr', 'usdt']);
    expect(d.toList).toEqual(['eth', 'usdt']);
    expect(d.market).toBeDefined();
    expect(d.recommendTo).toBeUndefined();
  });
});
