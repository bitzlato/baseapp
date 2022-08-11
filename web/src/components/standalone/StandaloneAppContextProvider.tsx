import { FC, useMemo } from 'react';
import { AppContext } from 'web/src/components/app/AppContext';
import { Language, Theme } from 'web/src/types';

interface Props {
  theme: Theme;
  language: Language;
}

export const StandaloneAppContextProvider: FC<Props> = ({ theme, language, children }) => {
  const isMobileDevice = false; // TODO: detect mobile device
  const value = useMemo(
    () => ({
      theme,
      lang: language,
      user: undefined,
      isMobileDevice,
      notificationSubscribe: () => () => {},
      handleFetchError: (error: unknown) => console.error(error),
    }),
    [theme, language, isMobileDevice],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
