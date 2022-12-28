import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserContext, UserContextValue } from 'web/src/components/app/UserContext';
import { selectUserFetching, selectUserInfo, selectUserLoggedIn } from 'web/src/modules';

export const UserContextProvider: FC = ({ children }) => {
  const user = useSelector(selectUserInfo);
  const isUserLoggedIn = useSelector(selectUserLoggedIn);
  const isUserFetching = useSelector(selectUserFetching);
  const value = useMemo(
    (): UserContextValue =>
      isUserLoggedIn
        ? {
            user,
            isUserLoggedIn,
            isUserActivated: user.state === 'active' && user.email_verified,
            isUserFetching: false,
          }
        : {
            user: undefined,
            isUserLoggedIn,
            isUserActivated: false,
            isUserFetching,
          },
    [isUserFetching, isUserLoggedIn, user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
