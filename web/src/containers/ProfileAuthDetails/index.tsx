import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useT } from 'web/src/hooks/useT';
import { ProfileTwoFactorAuth } from '..';
import { isUsernameEnabled } from '../../api';
import { selectUserInfo } from '../../modules';
import { toggle2faFetch, selectTwoFactorAuthSuccess } from '../../modules/user/profile';
import { TwoFactorModal } from './TwoFactorModal';

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

  const toggle2fa = () => {
    if (user.otp) {
      setShow2FAModal(true);
    } else {
      history.push('/profile/2fa');
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
        <ProfileTwoFactorAuth checked={user.otp} toggle2fa={toggle2fa} />
      </div>
      {show2FAModal && (
        <TwoFactorModal
          onClose={() => setShow2FAModal(false)}
          onSend={handleDisable2FA}
          buttonText={t('page.body.profile.header.account.content.twoFactorAuthentication.disable')}
        />
      )}
    </div>
  );
};
