import { format, formatByLocale } from './formatter';
import { Money, Currency } from './Money';

const fromDecimal = (amount: string, currency: Currency): Money => ({
    amount,
    currency,
});

describe('formatter', () => {
    const usdCurrency = {
        code: 'USD',
        minorUnit: 2,
    };

    const btcCurrency = {
        code: 'BTC',
        minorUnit: 8,
    };

    const neoCurrency = {
        code: 'NEO',
        minorUnit: 0,
    };

    const unknownCurrency = {
        code: 'UNKNOWN',
        minorUnit: 1,
    };

    test('should return the formatted amount', () => {
        expect(format(fromDecimal('1000.00010000', btcCurrency))).toEqual('1,000.0001');
        expect(format(fromDecimal('10230.0', btcCurrency))).toEqual('10,230.00');
        expect(
            format(fromDecimal('1000000', btcCurrency), {
                decimalSeparator: ',',
                groupSeparator: ' ',
            })
        ).toEqual('1 000 000,00');
        expect(format(fromDecimal('43123', neoCurrency))).toEqual('43,123');
        expect(format(fromDecimal('123.123456', btcCurrency), { maxFractionDigits: 4 })).toEqual('123.1234');
        expect(format(fromDecimal('12.128', usdCurrency))).toEqual('12.12');
        expect(
            format(fromDecimal('0.128345', usdCurrency), {
                maxFractionDigits: 6,
            })
        ).toEqual('0.12');
        expect(format(fromDecimal('43.55', usdCurrency), { maxFractionDigits: 1, minFractionDigits: 0 })).toEqual(
            '43.5'
        );
        expect(format(fromDecimal('143.66', unknownCurrency))).toEqual('143.6');
        expect(format(fromDecimal('143', unknownCurrency))).toEqual('143.0');
    });

    test('should return formatted by locale', () => {
        expect(formatByLocale('en', fromDecimal('10344000.35010000', btcCurrency))).toEqual('10,344,000.3501');
        expect(formatByLocale('ru', fromDecimal('10344000.35010000', btcCurrency))).toEqual('10 344 000,3501');
    });

    test('should remove trailing zeros', () => {
        expect(format(fromDecimal('0.00010000', btcCurrency))).toEqual('0.0001');
        expect(format(fromDecimal('123.0', btcCurrency))).toEqual('123.00');
        expect(format(fromDecimal('10.00000001', btcCurrency))).toEqual('10.00000001');
        expect(format(fromDecimal('43', btcCurrency))).toEqual('43.00');
        expect(format(fromDecimal('43', neoCurrency))).toEqual('43');
    });

    test('should NOT remove trailing zeros ', () => {
        expect(format(fromDecimal('0.00010000', btcCurrency), { removeTrailingZeros: false })).toEqual('0.00010000');
        expect(format(fromDecimal('123.0111', btcCurrency), { removeTrailingZeros: false })).toEqual('123.01110000');
    });
});
