import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Spinner } from 'web/src/components/ui/Spinner';
import { getUserContext, HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import {
  USER_STATUS_AUTHORIZATION_REQUIRED,
  USER_STATUS_AUTHORIZED,
  USER_STATUS_NOT_AUTHORIZED,
} from 'web/src/components/shared/sharedConstants';
import { Navigation } from 'web/src/components/shared/Header/Navigation';
import { UserMenu } from 'web/src/components/shared/Header/UserPanel/UserMenu';
import { Notifications } from 'web/src/components/shared/Header/UserPanel/Notifications';
import { LanguageSelect } from 'web/src/components/shared/Header/UserPanel/LanguageSelect';
import SupportIcon from 'web/src/assets/svg/SupportIcon.svg';
import ProfileIcon from 'web/src/assets/svg/ProfileIcon.svg';
import * as s from './UserPanel.css';

export type Props = {
  responsiveMode?: boolean;
};

export const UserPanel: FC<Props> = ({ responsiveMode = false }) => {
  const context = useContext(HeaderContext);
  const userContext = getUserContext(context);
  const { rightNavLinks, renderNavLinkComponent, t } = context;

  const handleSupportToggle = () => {
    global.toggleWidget();
  };

  if (userContext.status === USER_STATUS_NOT_AUTHORIZED) {
    return (
      <Box display="flex" alignItems="center" fontSize="medium" ml={responsiveMode ? '0' : 'auto'}>
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
      {userContext.status === USER_STATUS_AUTHORIZED && rightNavLinks ? (
        <Box
          className={s.navigation[responsiveMode ? 'responsiveMode' : 'base']}
          mr="4x"
          flexShrink={0}
        >
          <Navigation navLinks={rightNavLinks} renderNavLinkComponent={renderNavLinkComponent} />
        </Box>
      ) : null}

      {userContext.status === USER_STATUS_AUTHORIZATION_REQUIRED && (
        <>
          <Box
            className={s.signIn[responsiveMode ? 'responsiveMode' : 'base']}
            mr="3x"
            alignSelf="center"
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={userContext.onSignInClick}
            >
              {t('signIn')}
            </Button>
          </Box>
          <Box
            className={s.signIn[responsiveMode ? 'responsiveMode' : 'base']}
            mr={{ mobile: '3x', tablet: '9x' }}
            alignSelf="center"
          >
            {/* signup ID is needed for GA event */}
            <Button id="signup" color="primary" size="small" onClick={userContext.onSignUpClick}>
              {t('signUp')}
            </Button>
          </Box>
        </>
      )}

      <Box mr={{ mobile: '3x', desktop: '6x' }} flexShrink={0}>
        <LanguageSelect />
      </Box>

      <Box display="flex" alignItems="stretch" flexShrink={0}>
        <Box
          as="button"
          type="button"
          px="3x"
          color={{ default: 'headerIcon', hover: 'headerIconHover' }}
          onClick={handleSupportToggle}
        >
          <SupportIcon />
        </Box>

        {userContext.status === USER_STATUS_AUTHORIZED && userContext.notifications && (
          <Notifications
            px="3x"
            notifications={userContext.notifications}
            onAllRead={userContext.onAllRead}
          />
        )}

        {userContext.status === USER_STATUS_AUTHORIZED && <UserMenu px="3x" />}

        {userContext.status === USER_STATUS_AUTHORIZATION_REQUIRED ? (
          <Box
            as="button"
            className={s.signInMobile[responsiveMode ? 'responsiveMode' : 'base']}
            alignItems="center"
            px="3x"
            color={{ default: 'headerIcon', hover: 'headerIconHover' }}
            textDecoration="none"
            onClick={userContext.onSignInClick}
          >
            <ProfileIcon />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
