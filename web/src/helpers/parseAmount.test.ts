import { parseAmount } from './parseAmount';

describe('parseAmount', () => {
  test('should parse amount', () => {
    expect(parseAmount('', 2)).toEqual('');
    expect(parseAmount('0', 2)).toEqual('0');
    expect(parseAmount('99', 2)).toEqual('99');
    expect(parseAmount('99.1234', 2)).toEqual('99.12');
    expect(parseAmount('99.1234', 0)).toEqual('99');
    expect(parseAmount('99.1234', 5)).toEqual('99.1234');
    expect(parseAmount('99.123456789', 8)).toEqual('99.12345678');
  });
});
