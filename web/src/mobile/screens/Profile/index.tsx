import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth0 } from 'src/api';
import { Button } from 'src/components/Button/Button';
import { useT } from 'src/hooks/useT';
import { ChevronIcon } from '../../../assets/images/ChevronIcon';
import { copy, getLanguageName } from '../../../helpers';
import {
  alertPush,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectUserInfo,
} from '../../../modules';
import { ProfileLink, ProfileLinks, UserInfo } from '../../components';

const ProfileMobileScreenComponent: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const currentTheme = useSelector(selectCurrentColorTheme);

  const handleCopyText = () => {
    copy('referral-link');
    dispatch(
      alertPush({ message: ['page.mobile.profileLinks.link.referral.success'], type: 'success' }),
    );
  };

  const mainLinks = [
    {
      titleKey: 'page.mobile.profileLinks.main.verification',
      route: '/profile/verification',
      children: (
        <div>
          <span className="color-accent">
            {t('page.mobile.profileLinks.link.verification', { level: user.level })}
          </span>
          <ChevronIcon />
        </div>
      ),
    },
    {
      titleKey: 'page.mobile.profileLinks.main.2fa',
      route: '/profile/2fa',
      state: {
        enable2fa: !user.otp,
      },
      children: (
        <div>
          {user.otp ? (
            <span className="color-green">{t('page.mobile.profileLinks.link.2fa.enabled')}</span>
          ) : (
            <span className="color-red">{t('page.mobile.profileLinks.link.2fa.disabled')}</span>
          )}
          <ChevronIcon />
        </div>
      ),
    },
    !isAuth0()
      ? {
          titleKey: 'page.mobile.profileLinks.main.changePassword',
          route: '/profile/change-password',
        }
      : null,
    { titleKey: 'page.mobile.profileLinks.main.activity', route: '/profile/account-activity' },
    { titleKey: 'page.mobile.profileLinks.main.apiKeys', route: '/profile/api-keys' },
  ].filter(Boolean) as ProfileLink[];

  const settingsLinks = [
    {
      titleKey: 'page.mobile.profileLinks.settings.language',
      route: '/profile/language',
      children: (
        <div>
          <span>{getLanguageName(currentLanguage)}</span>
          <ChevronIcon />
        </div>
      ),
    },
    {
      titleKey: 'page.mobile.profileLinks.settings.theme',
      route: '/profile/theme',
      children: (
        <div>
          <span className="text-capitalize">{currentTheme}</span>
          <ChevronIcon />
        </div>
      ),
    },
  ];

  const additionalLinks = [
    {
      titleKey: 'page.mobile.profileLinks.additional.referral',
      route: '/profile',
      children: (
        <>
          <input
            type="text"
            id="referral-link"
            value={`${window.document.location.origin}/signup?refid=${user.uid}`}
            readOnly
            style={{ position: 'fixed', left: -9999 }}
          />
          <Button variant="primary" revertLightPrimary onClick={handleCopyText}>
            {t('page.mobile.profileLinks.link.referral')}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="pg-mobile-profile-screen">
      <UserInfo />
      <ProfileLinks links={mainLinks} />
      <ProfileLinks links={settingsLinks} />
      <ProfileLinks links={additionalLinks} />
    </div>
  );
};

export const ProfileMobileScreen = React.memo(ProfileMobileScreenComponent);
