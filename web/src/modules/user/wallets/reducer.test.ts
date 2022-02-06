import { WalletAddress } from 'src/modules/public/accounts/types';
import { CommonError } from '../../types';
import * as actions from './actions';
import { initialWalletsState, walletsReducer } from './reducer';
import type { WalletSource } from './types';

describe('walletsList reducer', () => {
  const wallets: WalletSource[] = [
    {
      balance: '0',
      locked: '0',
      price: '1',
      min_withdraw_amount: '0',
      limit_24_hour: '0',
      limit_1_month: '0',
      currency: 'btc',
      name: 'Bitcoin',
      explorer_address: 'https://testnet.blockchain.info/address/#{address}',
      explorer_transaction: 'https://testnet.blockchain.info/tx/#{txid}',
      withdraw_fee: '0',
      type: 'coin',
      precision: 8,
      icon_id: '',

      id: '',
      symbol: '',
      deposit_fee: '',
      min_confirmations: 0,
      min_deposit_amount: '',
      deposit_enabled: false,
      withdrawal_enabled: false,
      withdrawal_disabled_reason: '',
      base_factor: 0,
    },
    {
      balance: '0',
      locked: '0',
      price: '1',
      min_withdraw_amount: '0',
      limit_24_hour: '0',
      limit_1_month: '0',
      currency: 'bch',
      name: 'Bitcoin Cash',
      explorer_address: 'https://www.blocktrail.com/tBCC/address/#{address}',
      explorer_transaction: 'https://www.blocktrail.com/tBCC/tx/#{txid}',
      withdraw_fee: '0',
      type: 'coin',
      precision: 8,
      icon_id: '',

      id: '',
      symbol: '',
      deposit_fee: '',
      min_confirmations: 0,
      min_deposit_amount: '',
      deposit_enabled: false,
      withdrawal_enabled: false,
      withdrawal_disabled_reason: '',
      base_factor: 0,
    },
    {
      balance: '0',
      locked: '0',
      price: '1',
      min_withdraw_amount: '0',
      limit_24_hour: '0',
      limit_1_month: '0',
      currency: 'eth',
      name: 'Ethereum',
      explorer_address: 'https://rinkeby.etherscan.io/address/#{address}',
      explorer_transaction: 'https://rinkeby.etherscan.io/tx/#{txid}',
      withdraw_fee: '0',
      type: 'coin',
      precision: 8,
      icon_id: '',

      id: '',
      symbol: '',
      deposit_fee: '',
      min_confirmations: 0,
      min_deposit_amount: '',
      deposit_enabled: false,
      withdrawal_enabled: false,
      withdrawal_disabled_reason: '',
      base_factor: 0,
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

  const addressFetchPayload = {
    currency: 'btc',
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
      walletsReducer(initialWalletsState, actions.walletsAddressFetch(addressFetchPayload)),
    ).toEqual(expectedState);
  });

  it('should handle WALLETS_ADDRESS_DATA', () => {
    const initialState = {
      wallets: {
        list: wallets,
        loading: false,
        withdrawSuccess: false,
        mobileWalletChosen: '',
      },
    };

    const addressDataPayload: WalletAddress = {
      currencies: ['btc', 'tbtc'],
      address: 'address',
      state: 'active',
    };

    const updatedWallets: WalletSource[] = [
      {
        balance: '0',
        locked: '0',
        price: '1',
        min_withdraw_amount: '0',
        limit_24_hour: '0',
        limit_1_month: '0',
        currency: 'btc',
        name: 'Bitcoin',
        explorer_address: 'https://testnet.blockchain.info/address/#{address}',
        explorer_transaction: 'https://testnet.blockchain.info/tx/#{txid}',
        withdraw_fee: '0',
        type: 'coin',
        precision: 8,
        deposit_address: {
          currencies: ['btc', 'tbtc'],
          address: 'address',
          state: 'active',
        },
        icon_id: '',

        id: '',
        symbol: '',
        deposit_fee: '',
        min_confirmations: 0,
        min_deposit_amount: '',
        deposit_enabled: false,
        withdrawal_enabled: false,
        withdrawal_disabled_reason: '',
        base_factor: 0,
      },
      {
        balance: '0',
        locked: '0',
        price: '1',
        min_withdraw_amount: '0',
        limit_24_hour: '0',
        limit_1_month: '0',
        currency: 'bch',
        name: 'Bitcoin Cash',
        explorer_address: 'https://www.blocktrail.com/tBCC/address/#{address}',
        explorer_transaction: 'https://www.blocktrail.com/tBCC/tx/#{txid}',
        withdraw_fee: '0',
        type: 'coin',
        precision: 8,
        icon_id: '',

        id: '',
        symbol: '',
        deposit_fee: '',
        min_confirmations: 0,
        min_deposit_amount: '',
        deposit_enabled: false,
        withdrawal_enabled: false,
        withdrawal_disabled_reason: '',
        base_factor: 0,
      },
      {
        balance: '0',
        locked: '0',
        price: '1',
        min_withdraw_amount: '0',
        limit_24_hour: '0',
        limit_1_month: '0',
        currency: 'eth',
        name: 'Ethereum',
        explorer_address: 'https://rinkeby.etherscan.io/address/#{address}',
        explorer_transaction: 'https://rinkeby.etherscan.io/tx/#{txid}',
        withdraw_fee: '0',
        type: 'coin',
        precision: 8,
        icon_id: '',

        id: '',
        symbol: '',
        deposit_fee: '',
        min_confirmations: 0,
        min_deposit_amount: '',
        deposit_enabled: false,
        withdrawal_enabled: false,
        withdrawal_disabled_reason: '',
        base_factor: 0,
      },
    ];

    const expectedState = {
      wallets: {
        list: updatedWallets,
        loading: false,
        withdrawSuccess: false,
        mobileWalletChosen: '',
      },
    };
    expect(walletsReducer(initialState, actions.walletsAddressData(addressDataPayload))).toEqual(
      expectedState,
    );
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
