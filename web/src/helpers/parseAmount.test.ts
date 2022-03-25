import { parseAmount } from './parseAmount';

describe('parseAmount', () => {
  test('should parse amount', () => {
    expect(parseAmount('', { maxFractionDigits: 2 })).toEqual('');
    expect(parseAmount('0', { maxFractionDigits: 2 })).toEqual('0');
    expect(parseAmount('99', { maxFractionDigits: 2 })).toEqual('99');
    expect(parseAmount('99.1234', { maxFractionDigits: 2 })).toEqual('99.12');
    expect(parseAmount('99.1234', { maxFractionDigits: 0 })).toEqual('99');
    expect(parseAmount('99.1234', { maxFractionDigits: 5 })).toEqual('99.1234');
    expect(parseAmount('99.123456789', { maxFractionDigits: 8 })).toEqual('99.12345678');
  });
});
