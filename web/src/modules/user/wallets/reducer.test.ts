import { DepositAddress } from 'src/modules/public/accounts/types';
import { CommonError } from '../../types';
import * as actions from './actions';
import { initialWalletsState, walletsReducer } from './reducer';
import type { WalletSource } from './types';

const DEFAULT_WALLET: WalletSource = {
  balance: '0',
  locked: '0',
  price: '1',
  min_withdraw_amount: '0',
  limit_24_hour: '0',
  limit_1_month: '0',
  currency: 'btc',
  name: 'Bitcoin',
  withdraw_fee: '0',
  type: 'coin',
  precision: 8,
  icon_id: '',
  blockchain_ids: [],
  cc_code: '',
  deposit_enabled: true,
  deposit_fee: '0',
  description: null,
  homepage: null,
  id: '0',
  min_deposit_amount: '',
  position: 0,
  withdraw_limit_24h: '0',
  withdraw_limit_72h: '0',
  withdrawal_enabled: true,
};

describe('walletsList reducer', () => {
  const wallets: WalletSource[] = [
    {
      ...DEFAULT_WALLET,
    },
    {
      ...DEFAULT_WALLET,
      currency: 'bch',
      name: 'Bitcoin Cash',
    },
    {
      ...DEFAULT_WALLET,
      currency: 'eth',
      name: 'Ethereum',
    },
  ];

  const error: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  const withdrawCcyFetchPayload = {
    amount: '0.1',
    currency: 'btc',
    otp: '123123',
    beneficiary_id: '2NCimTNGnbm92drX7ARcwBKw6rvr456VWym',
  };

  it('should handle WALLETS_FETCH', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: true,
        withdrawSuccess: false,
        mobileWalletChosen: '',
        timestamp: Math.floor(Date.now() / 1000),
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsFetch())).toEqual(expectedState);
  });

  it('should handle WALLETS_DATA', () => {
    const expectedState = {
      wallets: {
        list: wallets,
        loading: false,
        withdrawSuccess: false,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsData(wallets))).toEqual(
      expectedState,
    );
  });

  it('should handle WALLETS_ERROR', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: false,
        withdrawSuccess: false,
        error: error,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsError(error))).toEqual(expectedState);
  });

  it('should handle WALLETS_ADDRESS_FETCH', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: true,
        withdrawSuccess: false,
        mobileWalletChosen: '',
        timestamp: Math.floor(Date.now() / 1000),
      },
    };
    expect(
      walletsReducer(initialWalletsState, actions.walletsAddressFetch({ blockchainId: 0 })),
    ).toEqual(expectedState);
  });

  it('should handle WALLETS_ADDRESS_ERROR', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: false,
        withdrawSuccess: false,
        error: error,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsAddressError(error))).toEqual(
      expectedState,
    );
  });

  it('should handle WALLETS_WITHDRAW_CCY_FETCH', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: true,
        withdrawSuccess: false,
        mobileWalletChosen: '',
      },
    };
    expect(
      walletsReducer(initialWalletsState, actions.walletsWithdrawCcyFetch(withdrawCcyFetchPayload)),
    ).toEqual(expectedState);
  });

  it('should handle WALLETS_WITHDRAW_CCY_DATA', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: false,
        withdrawSuccess: true,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsWithdrawCcyData())).toEqual(
      expectedState,
    );
  });

  it('should handle WALLETS_WITHDRAW_CCY_ERROR', () => {
    const expectedState = {
      wallets: {
        list: [],
        loading: false,
        withdrawSuccess: false,
        error: error,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialWalletsState, actions.walletsWithdrawCcyError(error))).toEqual(
      expectedState,
    );
  });
});
