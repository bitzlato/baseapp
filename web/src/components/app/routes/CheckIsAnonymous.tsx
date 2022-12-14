import { FC, PropsWithChildren, ReactElement, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'web/src/app/routes';
import { useUserContext } from 'web/src/components/app/UserContext';

export const CheckIsAnonymous: FC<PropsWithChildren<{}>> = ({ children }) => {
  // Check only the first rendering
  const { isUserLoggedIn } = useUserContext();
  const ref = useRef(isUserLoggedIn);

  // TODO: add spinner
  // if (isUserFetching) {
  //   return <Loading />;
  // }

  return ref.current ? <Redirect to={ROUTES.wallets} /> : (children as ReactElement);
};
