import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ChangePassword } from '../../../components';
import {
  changePasswordFetch,
  entropyPasswordFetch,
  selectCurrentPasswordEntropy,
} from '../../../modules';
import { Subheader } from '../../components';

const ChangePasswordScreenComponent: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();

  const handleChangePassword = (payload: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    if (payload) {
      dispatch(changePasswordFetch(payload));
      history.push('/profile');
    }
  };

  const fetchCurrentPasswordEntropy = (payload: { password: string }) => {
    if (payload) {
      dispatch(entropyPasswordFetch(payload));
    }
  };

  const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);

  return (
    <>
      <Subheader
        title={intl.formatMessage({ id: 'page.mobile.profile.changePassword.title' })}
        backTitle={intl.formatMessage({ id: 'page.body.profile.header.account' })}
        onGoBack={() => history.push('/profile')}
      />
      <div className="pg-mobile-profile-change-password-screen">
        <ChangePassword
          handleChangePassword={handleChangePassword}
          currentPasswordEntropy={currentPasswordEntropy}
          fetchCurrentPasswordEntropy={fetchCurrentPasswordEntropy}
        />
      </div>
    </>
  );
};

export const ProfileChangePasswordMobileScreen = React.memo(ChangePasswordScreenComponent);
