import { FC, PropsWithChildren, ReactElement } from 'react';
import { Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import { ROUTES, ROUTES_NEED_USER_ACTIVATED } from 'web/src/app/routes';
import { useUserContext } from 'web/src/components/app/UserContext';
import { EmailVerificationContainer } from 'web/src/components/user/EmailVerificationContainer';
import { Loading } from './Loading';

export const CheckIsLoggedIn: FC<PropsWithChildren<{}>> = ({ children }) => {
  const isNeedUserActivated = useRouteMatch(ROUTES_NEED_USER_ACTIVATED);
  const { pathname } = useLocation();
  const { isUserLoggedIn, isUserFetching, isUserActivated } = useUserContext();

  if (isUserFetching) {
    return <Loading />;
  }

  if (!isUserLoggedIn) {
    return (
      // TODO: replace back param to location state
      <Redirect to={`${ROUTES.signin}${pathname ? `?back=${pathname}` : ''}`} />
    );
  }

  if (isNeedUserActivated && !isUserActivated) {
    return <EmailVerificationContainer />;
  }

  return children as ReactElement;
};
