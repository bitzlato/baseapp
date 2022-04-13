import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentColorTheme } from 'web/src/modules';
import { AppContext } from './AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const theme = useSelector(selectCurrentColorTheme);
  const value = useMemo(() => ({ theme }), [theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
