import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

  const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

  if (!shouldRenderHeader) {
    return <React.Fragment />;
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
            <Button component={Link} to="/signin" variant="primary-outline" revertLightPrimary>
              {t('page.header.navbar.signIn')}
            </Button>
            <Button component={Link} to="/signup" variant="primary" revertLightPrimary>
              {t('page.header.signUp')}
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export const Header = React.memo(HeaderComponent);
