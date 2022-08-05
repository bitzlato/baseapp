import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { runNotificator } from 'web/src/lib/socket/notificator';
import { IWebsocketMessage } from 'web/src/lib/socket/types';
import { selectUserLoggedIn } from 'web/src/modules/user/profile/selectors';

export const useNotificator = () => {
  const isLogged = useSelector(selectUserLoggedIn);

  const notificator = useMemo(() => runNotificator(), []);

  useEffect(() => {
    if (isLogged) {
      notificator.connect();
    }

    return () => notificator.disconnect();
  }, [isLogged, notificator]);

  return useCallback(
    (callback: (notify: IWebsocketMessage) => void) => notificator.subscribe(callback),
    [notificator],
  );
};
