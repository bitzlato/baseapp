import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentColorTheme, selectCurrentLanguage } from 'web/src/modules';
import { AppContext } from './AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const lang = useSelector(selectCurrentLanguage);
  const value = useMemo(() => ({ theme, lang }), [theme, lang]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
