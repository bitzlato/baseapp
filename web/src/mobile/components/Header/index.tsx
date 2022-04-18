import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Box } from 'src/components/Box';
import { Button } from 'src/components/Button/Button';
import { useT } from 'src/hooks/useT';
import { ProfileIcon } from '../../../assets/images/sidebar/ProfileIcon';
import { Logo } from '../../../components';
import { selectUserLoggedIn } from '../../../modules';

const noHeaderRoutes = ['/setup'];

const HeaderComponent: React.FC = () => {
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const t = useT();
  const history = useHistory();

  const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

  if (!shouldRenderHeader) {
    return <></>;
  }

  return (
    <div className="pg-mobile-header">
      <Link to="/" className="pg-mobile-header__logo">
        <Logo />
      </Link>
      <Box row spacing>
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
  );
};

export const Header = React.memo(HeaderComponent);
