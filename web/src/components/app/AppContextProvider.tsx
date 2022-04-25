import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentColorTheme, selectCurrentLanguage, selectUserInfo } from 'web/src/modules';
import { AppContext } from './AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const lang = useSelector(selectCurrentLanguage);
  const user = useSelector(selectUserInfo);
  const value = useMemo(() => ({ theme, lang, user }), [theme, lang, user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
