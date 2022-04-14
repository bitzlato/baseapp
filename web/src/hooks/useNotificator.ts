import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import { selectUserLoggedIn } from '../modules';
import { runNotificator } from '../lib/socket';
import { IWebSocketTransport } from '../lib/socket/types';

export const useNotificator = () => {
  const isLogged = useSelector(selectUserLoggedIn);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    let notificatorInstance: IWebSocketTransport | null;

    if (isLogged) {
      notificatorInstance = runNotificator(mutate);
      notificatorInstance.connect();
    }

    return () => {
      if (notificatorInstance) {
        notificatorInstance.disconnect();
        notificatorInstance = null;
      }
    };
  }, [isLogged, mutate]);
};
