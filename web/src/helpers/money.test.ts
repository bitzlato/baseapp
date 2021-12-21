import { createCcy, createMoney } from './money';

describe('money', () => {
  test('createMoneyDown', () => {
    const ccy = createCcy('', 6);
    expect(createMoney('2.44757173344', ccy).toString()).toBe('2.447571');
    expect(createMoney('0.00000073344', ccy).toFormat()).toBe('0.00');
  });
});
