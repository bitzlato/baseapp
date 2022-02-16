import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { ThemeSwitcher } from 'web/src/components/shared/Header/ThemeSwitcher';
import ToProfileIcon from 'web/src/assets/svg/ToProfileIcon.svg';
import SpeedIcon from 'web/src/assets/svg/SpeedIcon.svg';
import LogoutIcon from 'web/src/assets/svg/LogoutIcon.svg';
import { Spinner } from 'web/src/components/ui/Spinner';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import { Stack } from 'web/src/components/ui/Stack';
import { getUserContext, HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from 'web/src/components/shared/sharedConstants';
import { UserMenu } from './UserMenu';
import { Notifications } from './Notifications';
import { LanguageSelect } from './LanguageSelect';
import * as s from './UserPanel.css';

export type Props = {
  responsiveMode?: boolean;
};

export const UserPanel: FC<Props> = ({ responsiveMode = false }) => {
  const context = useContext(HeaderContext);
  const userContext = getUserContext(context);
  const { enableMobileMenu, renderLinkComponent, t, toAdvertsPage } = context;

  if (userContext.status === USER_STATUS_NOT_AUTHORIZED) {
    return (
      <Box display="flex" alignItems="center" fontSize="medium" ml="auto">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="stretch"
      fontSize="medium"
      ml={responsiveMode ? '0' : 'auto'}
      height="full"
    >
      {userContext.status === USER_STATUS_AUTHORIZATION_REQUIRED && (
        <>
          <Box
            className={responsiveMode ? s.canBeHidden : undefined}
            mr={enableMobileMenu ? ['0', '5x'] : '5x'}
            alignSelf="center"
          >
            <Button onClick={userContext.onSignInClick}>{t('signIn')}</Button>
          </Box>
          <Box
            className={responsiveMode ? s.canBeHidden : undefined}
            display={enableMobileMenu ? ['none', 'block'] : undefined}
            mr="5x"
            alignSelf="center"
          >
            {/* signup ID is needed for GA event */}
            <Button id="signup" color="secondary" onClick={userContext.onSignUpClick}>
              {t('signUp')}
            </Button>
          </Box>
        </>
      )}

      <Stack
        display={enableMobileMenu ? ['none', 'flex'] : 'flex'}
        alignItems="stretch"
        marginRight="5x"
      >
        <ThemeSwitcher />
        <LanguageSelect />
      </Stack>

      <Stack display="flex" alignItems="stretch" marginRight="5x">
        {userContext.status === USER_STATUS_AUTHORIZED && (
          <Box display="flex" height="full" ml="5x">
            {userContext.user ? (
              <UserMenu user={userContext.user} userLinks={userContext.userLinks} />
            ) : (
              renderLinkComponent({
                className: sprinkles({
                  color: { default: 'interactive', hover: 'interactiveHighlighted' },
                  alignSelf: 'center',
                }),
                to: '/profile',
                title: t('profile'),
                children: <ToProfileIcon />,
              })
            )}
          </Box>
        )}
        {userContext.status === USER_STATUS_AUTHORIZED &&
          toAdvertsPage &&
          renderLinkComponent({
            className: sprinkles({
              color: { default: 'interactive', hover: 'interactiveHighlighted' },
              alignSelf: 'center',
            }),
            to: toAdvertsPage,
            title: t('adverts'),
            children: <SpeedIcon />,
          })}
        {userContext.status === USER_STATUS_AUTHORIZED && userContext.notifications && (
          <Notifications
            notifications={userContext.notifications}
            onAllRead={userContext.onAllRead}
          />
        )}
        {userContext.status === USER_STATUS_AUTHORIZED && (
          <Box
            as="button"
            type="button"
            color={{ default: 'interactive', hover: 'interactiveHighlighted' }}
            onClick={userContext.onLogoutClick}
          >
            <LogoutIcon />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
