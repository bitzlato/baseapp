import { useCallback, useEffect } from 'react';
import { notificator } from 'web/src/lib/socket/notificator';
import { IWebsocketMessage } from 'web/src/lib/socket/types';

export const useNotificator = (isLogged: boolean) => {
  useEffect(() => {
    if (isLogged) {
      notificator.connect();
    }

    return () => {
      notificator.disconnect();
    };
  }, [isLogged]);

  return useCallback(
    (callback: (notify: IWebsocketMessage) => void) => notificator.subscribe(callback),
    [],
  );
};
