import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { ProfileTwoFactorAuth } from '..';
import { isUsernameEnabled } from '../../api';
import { selectUserInfo } from '../../modules';
import { toggle2faFetch, selectTwoFactorAuthSuccess } from '../../modules/user/profile';
import { TwoFactorModal2 } from './TwoFactorModal';

export const ProfileAuthDetails: FC = () => {
  const [show2FAModal, setShow2FAModal] = useState(false);

  const user = useSelector(selectUserInfo);
  const twoFactorAuthSuccess = useSelector(selectTwoFactorAuthSuccess);

  const dispatch = useDispatch();
  const history = useHistory();

  const t = useT();

  useEffect(() => {
    if (twoFactorAuthSuccess) {
      setShow2FAModal(false);
    }
  }, [twoFactorAuthSuccess]);

  const handleDisable2FA = (code: string) => {
    dispatch(toggle2faFetch({ code, enable: false }));
  };

  const handleNavigateTo2fa = (enable2fa: boolean) => {
    if (enable2fa) {
      history.push('/security/2fa', { enable2fa });
    } else {
      setShow2FAModal(!show2FAModal);
    }
  };

  return (
    <div className="pg-profile-page__box pg-profile-page__left-col__basic">
      <div className="pg-profile-page__box-header pg-profile-page__left-col__basic__info-row">
        <div className="pg-profile-page__left-col__basic__info-row__block">
          <div className="pg-profile-page__row pg-profile-page__details-user">
            <p>{user.email}</p>
          </div>
          <div className="pg-profile-page__row">
            <h2>UID: {user.uid}</h2>
          </div>
          {isUsernameEnabled() && user.username ? (
            <div className="pg-profile-page__row">
              <h2>
                {t('page.body.profile.header.account.username')}: {user.username}
              </h2>
            </div>
          ) : null}
        </div>
      </div>
      <div className="pg-profile-page__row">
        <ProfileTwoFactorAuth is2faEnabled={user.otp} navigateTo2fa={handleNavigateTo2fa} />
      </div>
      {show2FAModal && (
        <TwoFactorModal2 onClose={() => setShow2FAModal(false)} onSend={handleDisable2FA} />
      )}
    </div>
  );
};
