import { updateHistory } from './actions';
import { historyReducer, initialHistoryState } from './reducer';
import { Deposit } from './types';

describe('HISTORY_UPDATE', () => {
  const newDeposit: Deposit = {
    amount: '0.02',
    completed_at: '2021-11-11T12:59:44+03:00',
    created_at: '2021-11-11T12:59:44+03:00',
    currency: 'eth',
    fee: '0.0',
    id: 652,
    state: 'accepted',
    tid: 'TID2C3AAFEF91',
    transfer_type: 'crypto',
    txid: '0xc0623d83757b3f8174a7890623df3605788e088f0f26b4c1f5041bc516c9bdd6',
    blockchain_id: 0,
    blockchain_key: '',
  };

  const updatedDeposit: Deposit = {
    amount: '0.02',
    completed_at: '2021-11-11T12:59:44+03:00',
    created_at: '2021-11-11T12:59:44+03:00',
    currency: 'eth',
    fee: '0.0',
    id: 652,
    state: 'dispatched',
    tid: 'TID2C3AAFEF91',
    transfer_type: 'crypto',
    txid: '0xc0623d83757b3f8174a7890623df3605788e088f0f26b4c1f5041bc516c9bdd6',
    blockchain_id: 0,
    blockchain_key: '',
  };

  it('insert new deposit', () => {
    expect(historyReducer(undefined, updateHistory(newDeposit))).toEqual({
      ...initialHistoryState,
      list: [newDeposit],
    });
  });

  it('update existing deposit', () => {
    const initialState = { ...initialHistoryState, list: [newDeposit] };
    expect(historyReducer(initialState, updateHistory(updatedDeposit))).toEqual({
      ...initialHistoryState,
      list: [updatedDeposit],
    });
  });
});
