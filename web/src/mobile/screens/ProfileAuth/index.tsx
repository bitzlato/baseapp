import { memo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TwoFactorModal2 } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { ProfileTwoFactorAuth } from '../../../containers/ProfileTwoFactorAuth';
import {
  selectTwoFactorAuthSuccess,
  selectUserInfo,
  toggle2faFetch,
  toggle2faSuccess,
} from '../../../modules/user/profile';
import { ProfileTwoFactorAuthScreen } from '../../../screens/ProfileTwoFactorAuthScreen';
import { Subheader } from '../../components/Subheader';

export const ProfileAuthMobileScreen: React.FC = memo(() => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const user = useSelector(selectUserInfo);
  const success = useSelector(selectTwoFactorAuthSuccess);

  useEffect(() => {
    if (success) {
      dispatch(toggle2faSuccess());
      history.push('/profile');
    }
  }, [success, dispatch, history]);

  const handleToggle2FA = (code2FA: string) => {
    dispatch(
      toggle2faFetch({
        code: code2FA,
        enable: false,
      }),
    );
  };

  const handleNavigateTo2fa = (enable2fa: boolean) => {
    if (!enable2fa) {
      setShowModal((state) => !state);
    }
  };

  return (
    <>
      <Subheader
        title={intl.formatMessage({ id: 'page.profile.kyc.title' })}
        backTitle={intl.formatMessage({ id: 'page.body.profile.header.account' })}
        onGoBack={() => history.push('/profile')}
      />
      <div className="cr-mobile-profile-auth">
        <div className="cr-mobile-profile-auth__enable">
          <div className="cr-mobile-profile-auth__enable-label">
            <ProfileTwoFactorAuth is2faEnabled={user.otp} navigateTo2fa={handleNavigateTo2fa} />
          </div>
          {!user.otp ? <ProfileTwoFactorAuthScreen /> : null}
        </div>
        {showModal ? (
          <TwoFactorModal2 onClose={() => setShowModal(false)} onSend={handleToggle2FA} />
        ) : null}
      </div>
    </>
  );
});
