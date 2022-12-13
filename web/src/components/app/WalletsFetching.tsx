import { FC } from 'react';
import { useUserContext } from 'web/src/components/app/UserContext';
import { WalletsFetch } from 'web/src/containers/WalletsFetch';

export const WalletsFetching: FC = () => {
  const { isUserLoggedIn, isUserActivated } = useUserContext();

  if (!isUserLoggedIn || !isUserActivated) {
    return null;
  }

  return <WalletsFetch />;
};
