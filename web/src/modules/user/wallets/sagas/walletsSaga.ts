import { call, put } from 'redux-saga/effects';
import { AccountBalanceSource, CurrencySource, sendError, WalletSource } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { walletsData, walletsError, WalletsFetch } from '../actions';

const OPTIONS: RequestOptions = {
  apiVersion: 'peatio',
};

export function* walletsSaga(action: WalletsFetch) {
  try {
    const accounts: AccountBalanceSource[] = yield call(API.get(OPTIONS), '/account/balances');
    const currencies: CurrencySource[] = yield call(API.get(OPTIONS), '/public/currencies');

    const wallets = currencies.map<WalletSource>((currency) => {
      const account = accounts.find((wallet) => wallet.currency === currency.id) ?? {
        currency: currency.id,
        balance: '0.0',
        locked: '0.0',
        limit_24_hour: '0.0',
        limit_1_month: '0.0',
      };

      return {
        ...account,
        name: currency?.name,
        explorer_transaction: currency.explorer_transaction,
        explorer_address: currency.explorer_address,
        withdraw_fee: currency.withdraw_fee,
        type: currency.type,
        fixed: currency.precision,
        icon_url: currency?.icon_url,
        icon_id: currency.icon_id,
        price: currency.price,
        precision: currency.precision,
        min_withdraw_amount: currency.min_withdraw_amount,
      };
    });

    yield put(walletsData(wallets));
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
