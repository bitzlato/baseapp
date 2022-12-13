import { FC, PropsWithChildren, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'web/src/app/routes';
import { useUserContext } from 'web/src/components/app/UserContext';
import { Loading } from './Loading';

export const CheckIsAnonymous: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isUserLoggedIn, isUserFetching } = useUserContext();

  if (isUserFetching) {
    return <Loading />;
  }

  return isUserLoggedIn ? <Redirect to={ROUTES.wallets} /> : (children as ReactElement);
};
