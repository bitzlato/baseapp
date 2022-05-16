import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Box } from 'src/components/Box';
import { Button } from 'src/components/Button/Button';
import { useT } from 'src/hooks/useT';
import {
  getUserContext,
  HeaderContext,
  HeaderContextValue,
} from 'web/src/components/shared/Header/HeaderContext';
import { Notifications } from 'web/src/components/shared/Header/UserPanel/Notifications';
import { USER_STATUS_AUTHORIZED } from 'web/src/components/shared/sharedConstants';
import { ProfileIcon } from '../../../assets/images/sidebar/ProfileIcon';
import { Logo } from '../../../components';
import { selectUserLoggedIn } from '../../../modules';

type Props = HeaderContextValue;

const noHeaderRoutes = ['/setup'];

const MobileNotificationsComponent: React.FC = () => {
  const context = React.useContext(HeaderContext);
  const userContext = getUserContext(context);

  if (userContext.status === USER_STATUS_AUTHORIZED && userContext.notifications) {
    return <Notifications notifications={userContext.notifications} onAllRead={userContext.onAllRead} />;
  }

  return null;
};

const HeaderComponent: React.FC<Props> = (props) => {
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const t = useT();
  const history = useHistory();

  const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

  if (!shouldRenderHeader) {
    return <></>;
  }

  return (
    <HeaderContext.Provider value={props}>
      <div className="pg-mobile-header">
        <Link to="/" className="pg-mobile-header__logo">
          <Logo />
        </Link>
        <Box row spacing>
          <MobileNotificationsComponent />
          {userLoggedIn ? (
            <Link to="/profile">
              <ProfileIcon className="pg-mobile-header__profile__icon" />
            </Link>
          ) : (
            <>
              <Button
                size="small"
                variant="primary-outline"
                revertLightPrimary
                onClick={() => history.push('/signin')}
              >
                {t('page.header.navbar.signIn')}
              </Button>
              <Button
                size="small"
                variant="primary"
                revertLightPrimary
                onClick={() => history.push('/signup')}
              >
                {t('page.header.signUp')}
              </Button>
            </>
          )}
        </Box>
      </div>
    </HeaderContext.Provider>
  );
};

export const Header = React.memo(HeaderComponent);
