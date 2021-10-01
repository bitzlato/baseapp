import * as WAValidator from 'multicoin-address-validator';

export const BZ_PUBLIC_NAME = 'bitzlatoPublicName';

const CUSTOM_REGEX: Record<string, string> = {
    [BZ_PUBLIC_NAME]: '[a-zA-Z0-9_]+',
};

const TOKEN_CHAIN = {
    erc20: 'eth',
    bep20: 'eth',
    hrc20: 'eth',
};

export function isValidAddress(address: string, currency: string, networkType = 'prod'): boolean {
    currency = TOKEN_CHAIN[currency.split('-')[1]] ?? currency;

    const regex = CUSTOM_REGEX[currency];

    if (currency === BZ_PUBLIC_NAME) {
        return new RegExp(`^(${regex!})$`).test(address) && !WAValidator.validate(address, 'btc');
    }

    try {
        return WAValidator.validate(address, currency, networkType);
    } catch (e) {
        return true;
    }
}
