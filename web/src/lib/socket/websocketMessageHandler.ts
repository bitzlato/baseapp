import { ScopedMutator } from 'swr/dist/types';
import { p2pUrl } from 'web/src/api';
import { Notification, IWebsocketMessage } from 'web/src/lib/socket/types';

export async function handleWebsocketMessage(
  mutate: ScopedMutator,
  eventMessage: IWebsocketMessage,
) {
  const { notificationId, name, ...data } = eventMessage;

  const newNotification: Notification = {
    id: eventMessage.notificationId,
    name: eventMessage.name,
    read: false,
    data,
  };

  mutate(`${p2pUrl}/notifications/`, async (cachedNotifications: Notification[]) => {
    return [newNotification, ...cachedNotifications];
  });
}
