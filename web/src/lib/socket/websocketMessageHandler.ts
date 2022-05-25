import { ScopedMutator } from 'swr/dist/types';
import { p2pUrl } from 'web/src/api';
import {
  Notification,
  IWebsocketMessage,
  NotificationTrade,
  NotificationNewMessage,
} from 'web/src/lib/socket/types';

const TradeEventList = [
  'tradeStatusChanged',
  'tradeExtendWaitingTime',
  'disputeResolved',
  'disputeAvailable',
];

export async function handleWebsocketMessage(
  mutate: ScopedMutator,
  eventMessage: IWebsocketMessage,
) {
  const { notificationId, name, ...data } = eventMessage;

  const eventName = eventMessage.name;

  if ((data as any).tradeId) {
    const { tradeId } = data as NotificationTrade;
    if (TradeEventList.includes(eventName)) {
      mutate(`${p2pUrl()}/trade/${tradeId}`);
    }

    if (eventName === 'newChatMessage') {
      const { isAdmin } = data as NotificationNewMessage;
      if (isAdmin) {
        mutate(`${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/`);
      } else {
        mutate(`${p2pUrl()}/trade/${tradeId}/chat/`);
      }
    }
  }

  const newNotification: Notification = {
    id: eventMessage.notificationId,
    name: eventMessage.name,
    read: false,
    data,
  };

  mutate(`${p2pUrl()}/notifications/`, async (cachedNotifications: Notification[]) => {
    return [newNotification, ...cachedNotifications];
  });
}
