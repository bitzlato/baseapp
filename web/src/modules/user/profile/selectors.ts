import { RootState } from '../..';
import { User } from './types';

export const selectChangePasswordSuccess = (state: RootState): boolean | undefined =>
  state.user.profile.passwordChange.success;

export const selectTwoFactorAuthQR = (state: RootState): string =>
  state.user.profile.twoFactorAuth.url;

export const selectTwoFactorAuthBarcode = (state: RootState): string =>
  state.user.profile.twoFactorAuth.barcode;

export const selectTwoFactorAuthSuccess = (state: RootState): boolean | undefined =>
  state.user.profile.twoFactorAuth.success;

export const selectUserState = (state: RootState): string => state.user.profile.userData.user.state;

export const selectUserLoggedIn = (state: RootState): boolean => {
  // return !profile.userData.isFetching && profile.userData.user.state === 'active';
  return !selectUserFetching(state) && selectUserState(state) !== '';
};

export const selectUserInfo = (state: RootState): User => state.user.profile.userData.user;

export const selectUserFetching = (state: RootState): boolean =>
  state.user.profile.userData.isFetching;

export const selectUserDataChange = (state: RootState): boolean | undefined =>
  state.user.profile.userData.success;

export const isPendingUser = (state: RootState): boolean => selectUserState(state) === 'pending';

export const selectVerifyEmail = (state: RootState): boolean =>
  !state.user.profile.userData.user.email_verified;

export const selectVerifyEmailAuth0 = (state: RootState): boolean =>
  state.user.profile.userData.verifyEmail;

export const selectUserDataError = (state: RootState) => state.user.profile.userData.error;

export const selectUserNeedVerification = (state: RootState) =>
  state.user.profile.userData.needVerification;

export const selectOtpEnabled = (state: RootState): boolean => selectUserInfo(state).otp;
