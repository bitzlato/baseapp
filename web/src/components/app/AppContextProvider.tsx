import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertFetchError,
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectMobileDeviceState,
  selectUserInfo,
} from 'web/src/modules';
import { AppContext } from './AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const lang = useSelector(selectCurrentLanguage);
  const user = useSelector(selectUserInfo);
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const dispatch = useDispatch();
  const value = useMemo(
    () => ({
      theme,
      lang,
      user,
      isMobileDevice,
      handleFetchError: (error: unknown) => dispatch(alertFetchError(error)),
    }),
    [theme, lang, user, isMobileDevice, dispatch],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
