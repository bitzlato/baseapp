import { CommonError } from '../../types';
import * as actions from './actions';
import { depositsReducer, initialDepositsState } from './reducer';
import { Deposit } from './types';

describe('Deposits reducer', () => {
    const fakeDeposits: Deposit[] = [
        {
            id: 1,
            currency: 'eth',
            name: 'First company',
            state: 'active',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        },
        {
            id: 2,
            currency: 'usd',
            name: 'Second company',
            state: 'archieved',
            description: 'Information about second company',
            data: {
                address: 'Somestreet 42, City',
                country: 'Wakanda',
                full_name: 'Some name',
                account_number: '1234512345',
                account_type: 'Account type',
                bank_name: 'First bank',
                bank_address: 'Anotherstreet 13',
                bank_country: 'Wakanda',
            },
        },
    ];

    const error: CommonError = {
        code: 500,
        message: ['Server error'],
    };

    it('should handle depositsFetch', () => {
        const expectedState = {
            ...initialDepositsState,
            fetch: {
                ...initialDepositsState.fetch,
                fetching: true,
            },
        };

        expect(depositsReducer(initialDepositsState, actions.depositsFetch())).toEqual(expectedState);
    });

    it('should handle depositsData', () => {
        const expectedState = {
            ...initialDepositsState,
            fetch: {
                ...initialDepositsState.fetch,
                data: fakeDeposits,
                fetching: false,
                success: true,
            },
         };

        expect(depositsReducer(initialDepositsState, actions.depositsData(fakeDeposits))).toEqual(expectedState);
    });

    it('should handle depositsDataUpdate', () => {
        const fakeDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'pending',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const fakeUpdatedDeposits: Deposit[] = [
            {
                id: 1,
                currency: 'eth',
                name: 'Company Name',
                state: 'pending',
                data: {
                    address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
                },
            },
            {
                id: 2,
                currency: 'usd',
                name: 'Second company',
                state: 'archieved',
                description: 'Information about second company',
                data: {
                    address: 'Somestreet 42, City',
                    country: 'Wakanda',
                    full_name: 'Some name',
                    account_number: '1234512345',
                    account_type: 'Account type',
                    bank_name: 'First bank',
                    bank_address: 'Anotherstreet 13',
                    bank_country: 'Wakanda',
                },
            },
        ];

        const initialState = {
            ...initialDepositsState,
            fetch: {
                ...initialDepositsState.fetch,
                data: fakeDeposits,
            },
        };

        const expectedState = {
            ...initialDepositsState,
            fetch: {
                ...initialDepositsState.fetch,
                data: fakeUpdatedDeposits,
                fetching: false,
                success: true,
                error: undefined,
            },
        };

        expect(depositsReducer(initialState, actions.depositsDataUpdate(fakeDeposit))).toEqual(expectedState);
    });

    it('should handle depositsError', () => {
        const expectedState = {
            ...initialDepositsState,
            fetch: {
                ...initialDepositsState.fetch,
                data: [],
                fetching: false,
                success: false,
                error: error,
            },
        };

        expect(depositsReducer(initialDepositsState, actions.depositsError(error))).toEqual(expectedState);
    });

    it('should handle depositsActivate', () => {
        const expectedState = {
            ...initialDepositsState,
            activate: {
                ...initialDepositsState.activate,
                fetching: true,
            },
        };

        const fakePayload = {
            pin: '123456',
            id: 1,
        };

        expect(depositsReducer(initialDepositsState, actions.depositsActivate(fakePayload))).toEqual(expectedState);
    });

    it('should handle depositsActivateData', () => {
        const fakeActiveDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'active',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const expectedState = {
            ...initialDepositsState,
            activate: {
                ...initialDepositsState.activate,
                data: fakeActiveDeposit,
                fetching: false,
                success: true,
            },
         };

        expect(depositsReducer(initialDepositsState, actions.depositsActivateData(fakeActiveDeposit))).toEqual(expectedState);
    });

    it('should handle depositsActivateError', () => {
        const expectedState = {
            ...initialDepositsState,
            activate: {
                ...initialDepositsState.activate,
                fetching: false,
                success: false,
                error: error,
            },
         };
        expect(depositsReducer(initialDepositsState, actions.depositsActivateError(error))).toEqual(expectedState);
    });

    it('should handle depositsCreate', () => {
        const expectedState = {
            ...initialDepositsState,
            create: {
                ...initialDepositsState.create,
                fetching: true,
            },
        };

        const fakePayload = {
            currency: 'eth',
            name: 'Company Name',
            description: 'Some description',
            data: '{"address": "0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a"}',
        };

        expect(depositsReducer(initialDepositsState, actions.depositsCreate(fakePayload))).toEqual(expectedState);
    });

    it('should handle depositsCreateData', () => {
        const fakeDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'pending',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const expectedState = {
            ...initialDepositsState,
            create: {
                ...initialDepositsState.create,
                data: fakeDeposit,
                fetching: false,
                success: true,
            },
         };

        expect(depositsReducer(initialDepositsState, actions.depositsCreateData(fakeDeposit))).toEqual(expectedState);
    });

    it('should handle depositsCreateError', () => {
        const expectedState = {
            ...initialDepositsState,
            create: {
                ...initialDepositsState.create,
                fetching: false,
                success: false,
                error: error,
            },
         };
        expect(depositsReducer(initialDepositsState, actions.depositsCreateError(error))).toEqual(expectedState);
    });

    it('should handle depositsDelete', () => {
        const expectedState = {
            ...initialDepositsState,
            delete: {
                ...initialDepositsState.delete,
                fetching: true,
            },
        };

        const fakePayload = {
            id: 1,
        };


        expect(depositsReducer(initialDepositsState, actions.depositsDelete(fakePayload))).toEqual(expectedState);
    });

    it('should handle depositsDeleteData', () => {
        const fakeSuccessPayload = {
            id: 1,
        };

        const expectedState = {
            ...initialDepositsState,
            delete: {
                ...initialDepositsState.delete,
                data: fakeSuccessPayload,
                fetching: false,
                success: true,
            },
         };

        expect(depositsReducer(initialDepositsState, actions.depositsDeleteData(fakeSuccessPayload))).toEqual(expectedState);
    });

    it('should handle depositsDeleteError', () => {
        const expectedState = {
            ...initialDepositsState,
            delete: {
                ...initialDepositsState.delete,
                fetching: false,
                success: false,
                error: error,
            },
         };
        expect(depositsReducer(initialDepositsState, actions.depositsDeleteError(error))).toEqual(expectedState);
    });

    it('should handle depositsResendPin', () => {
        const expectedState = {
            ...initialDepositsState,
            resendPin: {
                ...initialDepositsState.resendPin,
                fetching: true,
            },
        };

        const fakePayload = {
            id: 1,
        };

        expect(depositsReducer(initialDepositsState, actions.depositsResendPin(fakePayload))).toEqual(expectedState);
    });

    it('should handle depositsResendPinData', () => {
        const fakePayload = {
            id: 1,
        };

        const expectedState = {
            ...initialDepositsState,
            resendPin: {
                ...initialDepositsState.resendPin,
                data: fakePayload,
                fetching: false,
                success: true,
            },
         };

        expect(depositsReducer(initialDepositsState, actions.depositsResendPinData(fakePayload))).toEqual(expectedState);
    });

    it('should handle depositsResendPinError', () => {
        const expectedState = {
            ...initialDepositsState,
            resendPin: {
                ...initialDepositsState.resendPin,
                fetching: false,
                success: false,
                error: error,
            },
         };
        expect(depositsReducer(initialDepositsState, actions.depositsResendPinError(error))).toEqual(expectedState);
    });
});
