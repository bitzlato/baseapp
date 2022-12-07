import { createContext, useContext } from 'react';
import { User } from 'web/src/modules/user/profile/types';

export type UserContextValue =
  | {
      user: undefined;
      isUserLoggedIn: false;
      isUserActivated: false;
      isUserFetching: boolean;
    }
  | {
      user: User;
      isUserLoggedIn: true;
      isUserActivated: boolean;
      isUserFetching: false;
    };

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  isUserLoggedIn: false,
  isUserActivated: false,
  isUserFetching: true,
});

export const useUserContext = () => useContext(UserContext);

export const useUser = () => useUserContext().user;

export const useIsUserLoggedIn = () => useUserContext().isUserLoggedIn;

export const useIsUserActivated = () => useUserContext().isUserActivated;
