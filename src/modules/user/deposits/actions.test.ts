import { CommonError } from '../../types';
import * as actions from './actions';
import {
    DEPOSITS_ACTIVATE,
    DEPOSITS_ACTIVATE_DATA,
    DEPOSITS_ACTIVATE_ERROR,
    DEPOSITS_CREATE,
    DEPOSITS_CREATE_DATA,
    DEPOSITS_CREATE_ERROR,
    DEPOSITS_DATA,
    DEPOSITS_DATA_UPDATE,
    DEPOSITS_DELETE,
    DEPOSITS_DELETE_DATA,
    DEPOSITS_DELETE_ERROR,
    DEPOSITS_ERROR,
    DEPOSITS_FETCH,
    DEPOSITS_RESEND_PIN,
    DEPOSITS_RESEND_PIN_DATA,
    DEPOSITS_RESEND_PIN_ERROR,
} from './constants';
import { Deposit } from './types';

describe('Deposits actions', () => {
    const fakeDepositsArray: Deposit[] = [
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

    const fakeError: CommonError = {
        code: 500,
        message: ['Server error'],
    };

    it('should check depositsActivate action creator', () => {
        const payload = {
            pin: '123456',
            id: 1,
        };

        const expectedAction = { type: DEPOSITS_ACTIVATE, payload };
        expect(actions.depositsActivate(payload)).toEqual(expectedAction);
    });

    it('should check depositsActivateData action creator', () => {
        const fakeActiveDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'active',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const expectedAction = { type: DEPOSITS_ACTIVATE_DATA, payload: fakeActiveDeposit };
        expect(actions.depositsActivateData(fakeActiveDeposit)).toEqual(expectedAction);
    });

    it('should check depositsActivateError action creator', () => {
        const expectedAction = { type: DEPOSITS_ACTIVATE_ERROR, error: fakeError };
        expect(actions.depositsActivateError(fakeError)).toEqual(expectedAction);
    });


    it('should check depositsCreate action creator', () => {
        const fakeCreatePayload = {
            currency: 'eth',
            name: 'Company Name',
            description: 'Some description',
            data: '{"address": "0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a"}',
        };

        const expectedAction = {type: DEPOSITS_CREATE, payload: fakeCreatePayload };
        expect(actions.depositsCreate(fakeCreatePayload)).toEqual(expectedAction);
    });

    it('should check depositsCreateData action creator', () => {
        const fakeCreateDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'pending',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const expectedAction = { type: DEPOSITS_CREATE_DATA, payload: fakeCreateDeposit };
        expect(actions.depositsCreateData(fakeCreateDeposit)).toEqual(expectedAction);
    });

    it('should check depositsCreateError action creator', () => {
        const expectedAction = { type: DEPOSITS_CREATE_ERROR, error: fakeError };
        expect(actions.depositsCreateError(fakeError)).toEqual(expectedAction);
    });

    it('should check depositsDelete action creator', () => {
        const payload = {
            id: 1,
        };

        const expectedAction = {type: DEPOSITS_DELETE, payload };
        expect(actions.depositsDelete(payload)).toEqual(expectedAction);
    });

    it('should check depositsDeleteData action creator', () => {
        const payload = {
            id: 1,
        };

        const expectedAction = { type: DEPOSITS_DELETE_DATA, payload };
        expect(actions.depositsDeleteData(payload)).toEqual(expectedAction);
    });

    it('should check depositsDeleteError action creator', () => {
        const expectedAction = { type: DEPOSITS_DELETE_ERROR, error: fakeError };
        expect(actions.depositsDeleteError(fakeError)).toEqual(expectedAction);
    });

    it('should check depositsFetch action creator', () => {
        const expectedAction = { type: DEPOSITS_FETCH, payload: { currency_id: 'btc'} };
        expect(actions.depositsFetch({ currency_id: 'btc' })).toEqual(expectedAction);
    });

    it('should check depositsData action creator', () => {
        const expectedAction = { type: DEPOSITS_DATA, payload: fakeDepositsArray };
        expect(actions.depositsData(fakeDepositsArray)).toEqual(expectedAction);
    });

    it('should check depositsDataUpdate action creator', () => {
        const fakeCreateDeposit: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'Company Name',
            state: 'pending',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const expectedAction = { type: DEPOSITS_DATA_UPDATE, payload: fakeCreateDeposit };
        expect(actions.depositsDataUpdate(fakeCreateDeposit)).toEqual(expectedAction);
    });

    it('should check depositsError action creator', () => {
        const expectedAction = { type: DEPOSITS_ERROR, error: fakeError };
        expect(actions.depositsError(fakeError)).toEqual(expectedAction);
    });

    it('should check depositsResendPin action creator', () => {
        const payload = {
            id: 1,
        };

        const expectedAction = { type: DEPOSITS_RESEND_PIN, payload };
        expect(actions.depositsResendPin(payload)).toEqual(expectedAction);
    });

    it('should check depositsResendPinData action creator', () => {
        const payload = {
            id: 1,
        };

        const expectedAction = { type: DEPOSITS_RESEND_PIN_DATA, payload: payload };
        expect(actions.depositsResendPinData(payload)).toEqual(expectedAction);
    });

    it('should check depositsResendPinError action creator', () => {
        const expectedAction = { type: DEPOSITS_RESEND_PIN_ERROR, error: fakeError };
        expect(actions.depositsResendPinError(fakeError)).toEqual(expectedAction);
    });

});
