import { call, put } from 'redux-saga/effects';
import { Account, Currency, sendError, Wallet } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { walletsData, walletsError, WalletsFetch } from '../actions';

const walletsOptions: RequestOptions = {
  apiVersion: 'peatio',
};

const currenciesOptions: RequestOptions = {
  apiVersion: 'peatio',
};

export function* walletsSaga(action: WalletsFetch) {
  try {
    const accounts: Account[] = yield call(API.get(walletsOptions), '/account/balances');
    const currencies: Currency[] = yield call(API.get(currenciesOptions), '/public/currencies');

    const accountsByCurrencies = currencies.map<Wallet>((currency) => {
      let walletInfo = accounts.find((wallet) => wallet.currency === currency.id);

      if (!walletInfo) {
        walletInfo = {
          currency: currency.id,
        };
      }

      return {
        ...walletInfo,
        name: currency?.name,
        explorerTransaction: currency?.explorer_transaction,
        explorerAddress: currency?.explorer_address,
        fee: Number(currency?.withdraw_fee),
        type: currency?.type,
        fixed: currency?.precision,
        iconUrl: currency?.icon_url,
        icon_id: currency.icon_id,
      };
    });

    yield put(walletsData(accountsByCurrencies));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: 'alert',
        extraOptions: {
          actionError: walletsError,
        },
      }),
    );
  }
}
