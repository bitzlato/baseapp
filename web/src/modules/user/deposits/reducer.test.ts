import { CommonError } from '../../types';
import * as actions from './actions';
import { depositIntentionReducer, initialDepositsState } from './reducer';

describe('Deposits reducer', () => {
  const error: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  it('should handle depositsCreateError', () => {
    const expectedState = {
      ...initialDepositsState,
      error,
    };
    expect(
      depositIntentionReducer(initialDepositsState, actions.depositsCreateError(error)),
    ).toEqual(expectedState);
  });
});
