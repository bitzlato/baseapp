import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'web/src/hooks/useT';
import { Profile } from 'web/src/components/profile/Profile';
import { ChevronIcon } from 'web/src/assets/images/ChevronIcon';
import { getLanguageName } from 'web/src/helpers';
import {
  logoutFetch,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectUserInfo,
} from 'web/src/modules';
import { ProfileLink, ProfileLinks } from 'web/src/mobile/components';
import { Box } from 'web/src/components/ui/Box';

const ProfileMobileScreenComponent: React.FC = () => {
  const t = useT();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const currentTheme = useSelector(selectCurrentColorTheme);

  const historyLinks: ProfileLink[] = [
    { titleKey: 'page.mobile.profileLinks.history.orders', route: '/orders' },
    { titleKey: 'page.mobile.profileLinks.history.fees', route: '/fees' },
    { titleKey: 'Reports', route: '/reports' },
  ];

  const mainLinks = [
    {
      titleKey: 'merge.title',
      route: '/profile/telegram',
    },
    {
      titleKey: 'Settings',
      route: '/profile/settings',
    },
    {
      titleKey: 'page.mobile.profileLinks.main.2fa',
      route: '/profile/2fa',
      children: (
        <>
          {user.otp ? (
            <span className="color-green">{t('page.mobile.profileLinks.link.2fa.enabled')}</span>
          ) : (
            <span className="color-red">{t('page.mobile.profileLinks.link.2fa.disabled')}</span>
          )}
          <ChevronIcon />
        </>
      ),
    },
    { titleKey: 'page.mobile.profileLinks.main.activity', route: '/profile/account-activity' },
    { titleKey: 'page.mobile.profileLinks.main.apiKeys', route: '/profile/api-keys' },
  ].filter(Boolean) as ProfileLink[];

  const settingsLinks = [
    {
      titleKey: 'page.mobile.profileLinks.settings.language',
      route: '/profile/language',
      children: (
        <>
          <span>{getLanguageName(currentLanguage)}</span>
          <ChevronIcon />
        </>
      ),
    },
    {
      titleKey: 'page.mobile.profileLinks.settings.theme',
      route: '/profile/theme',
      children: (
        <>
          <span className="text-capitalize">
            {t(`page.mobile.profileColorTheme.theme.${currentTheme}`)}
          </span>
          <ChevronIcon />
        </>
      ),
    },
  ];

  const handleLogout = () => dispatch(logoutFetch());

  return (
    <div className="pg-mobile-profile-screen">
      <Profile />
      <ProfileLinks links={historyLinks} />
      <ProfileLinks links={mainLinks} />
      <ProfileLinks links={settingsLinks} />

      <div className="pg-mobile-profile-links">
        <Box
          as="button"
          type="button"
          width="full"
          height="15x"
          fontWeight="strong"
          color="textHighlighted"
          onClick={handleLogout}
        >
          {t('page.mobile.userInfo.logout.button')}
        </Box>
      </div>
    </div>
  );
};

export const ProfileMobileScreen = React.memo(ProfileMobileScreenComponent);
