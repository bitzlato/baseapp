import { parseInteger, parseNumeric } from './parseNumeric';

describe('parseNumeric', () => {
  test('should parse numberic values', () => {
    expect(parseNumeric('')).toEqual('');
    expect(parseNumeric('-')).toEqual('');
    expect(parseNumeric('0')).toEqual('0');
    expect(parseNumeric('-0')).toEqual('0');
    expect(parseNumeric('00')).toEqual('00');
    expect(parseNumeric('.')).toEqual('0.');
    expect(parseNumeric('-.')).toEqual('0.');
    expect(parseNumeric('.1')).toEqual('0.1');
    expect(parseNumeric('100,99')).toEqual('100.99');
    expect(parseNumeric('100,000,000.77')).toEqual('100000000.77');
    expect(parseNumeric('100 000 000.77')).toEqual('100000000.77');
    expect(parseNumeric('100,55 RUB')).toEqual('100.55');
    expect(parseNumeric('99FOO55BAR')).toEqual('9955');
    expect(parseNumeric('-100,99')).toEqual('100.99');
  });

  test('should parse negative numeric values', () => {
    const options = { allowNegativeNumeric: true };

    expect(parseNumeric('-', options)).toEqual('-');
    expect(parseNumeric('-.', options)).toEqual('-0.');
    expect(parseNumeric('-.1', options)).toEqual('-0.1');
    expect(parseNumeric('-100-99', options)).toEqual('-10099');
    expect(parseNumeric('1-00-99', options)).toEqual('10099');
  });

  test('should parse integer numeric values', () => {
    expect(parseInteger('.')).toEqual('');
    expect(parseInteger('-.', true)).toEqual('-');
    expect(parseInteger('10')).toEqual('10');
    expect(parseInteger('-10', true)).toEqual('-10');
    expect(parseInteger('-0.1')).toEqual('0');
    expect(parseInteger('-0.1', true)).toEqual('-0');
    expect(parseInteger('100,000,000.77')).toEqual('100000000');
    expect(parseInteger('-100,000,000.77', true)).toEqual('-100000000');
    expect(parseInteger('100-99')).toEqual('10099');
    expect(parseInteger('-1-00-99', true)).toEqual('-10099');
  });

  test('should parse numeric and trim right dot', () => {
    expect(parseNumeric('.', { trimRightDot: true })).toEqual('0');
    expect(parseNumeric('1.', { trimRightDot: true })).toEqual('1');
    expect(parseNumeric('100,', { trimRightDot: true })).toEqual('100');
    expect(parseNumeric('100,00', { trimRightDot: true })).toEqual('100.00');
    expect(parseNumeric('10', { trimRightDot: true })).toEqual('10');
    expect(parseNumeric('-.', { trimRightDot: true, allowNegativeNumeric: true })).toEqual('-0');
    expect(parseNumeric('-1.', { trimRightDot: true, allowNegativeNumeric: true })).toEqual('-1');
    expect(parseNumeric('-100,', { trimRightDot: true, allowNegativeNumeric: true })).toEqual(
      '-100',
    );
    expect(parseNumeric('-1', { trimRightDot: true, allowNegativeNumeric: false })).toEqual('1');
  });

  test('should parse numeric with limited fractional digits', () => {
    expect(parseNumeric('', { maxFractionDigits: 2 })).toEqual('');
    expect(parseNumeric('0', { maxFractionDigits: 2 })).toEqual('0');
    expect(parseNumeric('99', { maxFractionDigits: 2 })).toEqual('99');
    expect(parseNumeric('99.1234', { maxFractionDigits: 2 })).toEqual('99.12');
    expect(parseNumeric('99.1234', { maxFractionDigits: 0 })).toEqual('99');
    expect(parseNumeric('99.1234', { maxFractionDigits: 5 })).toEqual('99.1234');
    expect(parseNumeric('99.123456789', { maxFractionDigits: 8 })).toEqual('99.12345678');
  });
});
