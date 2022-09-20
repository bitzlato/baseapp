import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Box } from 'web/src/components/Box/Box';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { ProfileTwoFactorAuthScreen } from 'web/src/screens/ProfileTwoFactorAuthScreen/ProfileTwoFactorAuthScreen';
import {
  selectTwoFactorAuthSuccess,
  selectUserInfo,
  toggle2faFetch,
  toggle2faSuccess,
} from 'web/src/modules/user/profile';
import { ProfileTwoFactorAuth } from 'web/src/containers/ProfileTwoFactorAuth';
import { useT } from 'web/src/hooks/useT';
import { BackButtonMobile } from 'web/src/components/shared/Header/BackButtonMobile';

export const ProfileAuthMobileScreen: React.FC = memo(() => {
  const [showCode, setShowCode] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUserInfo);
  const success = useSelector(selectTwoFactorAuthSuccess);

  const t = useT();

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

  const handleNavigateTo2fa = () => {
    if (user.otp) {
      setShowCode(true);
    }
  };

  return (
    <Box col spacing="sm">
      <BackButtonMobile to="/profile">{t('page.body.profile.header.account')}</BackButtonMobile>
      <div className="cr-mobile-profile-auth">
        <div className="cr-mobile-profile-auth__enable">
          <div className="cr-mobile-profile-auth__enable-label">
            <ProfileTwoFactorAuth checked={user.otp} toggle2fa={handleNavigateTo2fa} />
          </div>
        </div>
      </div>
      {!user.otp ? (
        <Box bgColor="body" padding="2X3" col spacing="2">
          <ProfileTwoFactorAuthScreen />
        </Box>
      ) : null}
      {showCode ? (
        <TwoFactorModal
          onClose={() => setShowCode(false)}
          onSend={handleToggle2FA}
          buttonText={t('page.body.profile.header.account.content.twoFactorAuthentication.disable')}
        />
      ) : null}
    </Box>
  );
});
