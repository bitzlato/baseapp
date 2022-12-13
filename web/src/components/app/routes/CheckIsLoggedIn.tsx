import { FC, PropsWithChildren, ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from 'web/src/app/routes';
import { useUserContext } from 'web/src/components/app/UserContext';
import { Loading } from './Loading';

export const CheckIsLoggedIn: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { pathname } = useLocation();
  const { isUserLoggedIn, isUserFetching } = useUserContext();

  if (isUserFetching) {
    return <Loading />;
  }

  return !isUserLoggedIn ? (
    // TODO: replace back param to location state
    <Redirect to={`${ROUTES.signin}${pathname ? `?back=${pathname}` : ''}`} />
  ) : (
    (children as ReactElement)
  );
};
