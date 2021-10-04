import { CommonError } from '../../types';
import * as actions from './actions';
import { DEPOSITS_CREATE_ERROR } from './constants';

describe('Deposits actions', () => {
  const fakeError: CommonError = {
    code: 500,
    message: ['Server error'],
  };

  it('should check depositsCreateError action creator', () => {
    const expectedAction = { type: DEPOSITS_CREATE_ERROR, error: fakeError };
    expect(actions.depositsCreateError(fakeError)).toEqual(expectedAction);
  });
});
