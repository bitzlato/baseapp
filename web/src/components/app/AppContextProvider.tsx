import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotificator } from 'web/src/components/app/useNotificator';
import {
  alertFetchError,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectMobileDeviceState,
  selectUserInfo,
  selectUserLoggedIn,
} from 'web/src/modules';
import { AppContext } from './AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const lang = useSelector(selectCurrentLanguage);
  const user = useSelector(selectUserInfo);
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const dispatch = useDispatch();
  const notificationSubscribe = useNotificator(userLoggedIn);
  const value = useMemo(
    () => ({
      theme,
      lang,
      user: userLoggedIn ? user : undefined,
      isMobileDevice,
      notificationSubscribe,
      handleFetchError: (error: unknown) => dispatch(alertFetchError(error)),
    }),
    [theme, lang, userLoggedIn, user, isMobileDevice, notificationSubscribe, dispatch],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
