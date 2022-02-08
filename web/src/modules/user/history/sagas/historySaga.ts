import { call, put } from 'redux-saga/effects';
import { sendError, WalletHistoryList } from '../../..';
import { API, defaultStorageLimit, RequestOptions } from '../../../../api';
import { getHistorySagaParam, sliceArray } from '../../../../helpers';
import { failHistory, HistoryFetch, successHistory } from '../actions';

const config: RequestOptions = {
  apiVersion: 'peatio',
};

export function* historySaga(action: HistoryFetch) {
  try {
    const { type, limit, page } = action.payload;
    const coreEndpoint = {
      deposits: '/account/deposits',
      withdraws: '/account/withdraws',
      trades: '/market/trades',
      transfers: '/account/internal_transfers',
    };
    const params = getHistorySagaParam(action.payload);
    const data: unknown = yield call(
      API.get(config),
      `${coreEndpoint[type as keyof typeof coreEndpoint]}?${params}`,
    );

    let nextPageExists = false;

    if (limit && (data as any).length === limit) {
      const testActionPayload = {
        ...action.payload,
        page: (page + 1) * limit,
        limit: 1,
      };
      const testParams = getHistorySagaParam(testActionPayload);
      const checkData: unknown = yield call(
        API.get(config),
        `${coreEndpoint[type as keyof typeof coreEndpoint]}?${testParams}`,
      );

      if ((checkData as any).length === 1) {
        nextPageExists = true;
      }
    }
    let updatedData = data;

    if (type === 'trades') {
      updatedData = sliceArray(data, defaultStorageLimit());
    }

    yield put(successHistory({ list: updatedData as WalletHistoryList, page, nextPageExists }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: failHistory,
        },
      }),
    );
  }
}
