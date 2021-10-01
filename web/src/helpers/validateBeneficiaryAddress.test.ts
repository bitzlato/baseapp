import { BZ_PUBLIC_NAME, isValidAddress } from './validateBeneficiaryAddress';

describe('Beneficiary Address Validaity Test', () => {
    it('should validate Bitzlato Public Name', () => {
        expect(isValidAddress('MalePercyTheThird', BZ_PUBLIC_NAME)).toBeTruthy();
        expect(isValidAddress('17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem', BZ_PUBLIC_NAME)).toBeFalsy();
        expect(isValidAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', BZ_PUBLIC_NAME)).toBeFalsy();
    });

    it('should validate bnb-bep20', () => {
        expect(isValidAddress('0x8b39275d115b5a7931009b89b20221589e6c713c', 'bnb-bep20')).toBeTruthy();
    });

    it('should validate usdt-bep20', () => {
        expect(isValidAddress('0x8b39275d115b5a7931009b89b20221589e6c713c', 'usdt-bep20')).toBeTruthy();
    });

    it('should validate usdc-erc20', () => {
        expect(isValidAddress('0xbea2b235d4b48f03f42b40e1e2f5320541251613', 'usdc-erc20')).toBeTruthy();
    });

    it('should validate usdt-hrc20', () => {
        expect(isValidAddress('0xe4d635204abcf1a9f54407a21e9efecddc811262', 'usdt-hrc20')).toBeTruthy();
    });
});
