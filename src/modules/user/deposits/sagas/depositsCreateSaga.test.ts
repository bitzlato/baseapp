import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../../helpers/jest';
import { rootSaga, sendError } from '../../../../modules/index';
import { CommonError } from '../../../types';
import {
    depositsCreate,
    depositsCreateData,
    depositsCreateError,
    depositsDataUpdate,
} from '../actions';
import { Deposit } from '../types';

const debug = false;

describe('Deposits Create', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, debug)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    describe('Create deposits data', () => {
        const fakePayload = {
            currency: 'eth',
            name: 'First company',
            data: '{"address": "0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a"}',
        };

        const fakeSuccessPayload: Deposit = {
            id: 1,
            currency: 'eth',
            name: 'First company',
            state: 'pending',
            data: {
                address: '0xa96bbd0de64ef10659ae49d5ca4bb8109169007eb90d53aa3f87b6dc65530d8a',
            },
        };

        const mockDepositsCreate = () => {
            mockAxios.onPost('/account/deposits').reply(200, fakeSuccessPayload);
        };

        const error: CommonError = {
            code: 500,
            message: ['Server error'],
        };

        const expectedDepositsCreateSuccess = [
            depositsCreate(fakePayload),
            depositsCreateData(fakeSuccessPayload),
            depositsDataUpdate(fakeSuccessPayload),
        ];

        const expectedDepositsCreateError = [
            depositsCreate(fakePayload),
            sendError({
                error,
                processingType: 'alert',
                extraOptions: {
                    actionError: depositsCreateError,
                },
            }),
        ];

        it('should create deposits in success flow', async () => {
            mockDepositsCreate();

            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedDepositsCreateSuccess.length) {
                        expect(actions).toEqual(expectedDepositsCreateSuccess);
                        resolve();
                    }
                });
            });
            store.dispatch(depositsCreate(fakePayload));

            return promise;
        });

        it('should handle create deposits error', async () => {
            mockNetworkError(mockAxios);
            const promise = new Promise(resolve => {
                store.subscribe(() => {
                    const actions = store.getActions();
                    if (actions.length === expectedDepositsCreateError.length) {
                        expect(actions).toEqual(expectedDepositsCreateError);
                        resolve();
                    }
                });
            });
            store.dispatch(depositsCreate(fakePayload));

            return promise;
        });
    });
});
