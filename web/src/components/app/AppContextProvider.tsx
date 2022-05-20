import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
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
  const value = useMemo(
    () => ({ theme, lang, user, isMobileDevice }),
    [theme, lang, user, isMobileDevice],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
