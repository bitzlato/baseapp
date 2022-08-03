import { ScopedMutator } from 'swr/dist/types';
import { p2pUrl } from 'web/src/api';
import { getP2PTradeChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { getP2PTradeChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChatUnread';
import { getP2PTradeDisputeEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDispute';
import { getP2PTradeDisputeUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeUnread';
import { getP2PUserChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChat';
import { getP2PUserChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChatUnread';
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
    // trade events
    const { tradeId } = data as NotificationTrade;
    if (TradeEventList.includes(eventName)) {
      mutate(`${p2pUrl()}/trade/${tradeId}`);
    }

    if (eventName === 'newChatMessage') {
      const { isAdmin } = data as NotificationNewMessage;
      if (isAdmin) {
        mutate(getP2PTradeDisputeEndpoint(tradeId));
        mutate(getP2PTradeDisputeUnreadEndpoint(tradeId));
      } else {
        mutate(getP2PTradeChatEndpoint(tradeId));
        mutate(getP2PTradeChatUnreadEndpoint(tradeId));
      }
    }
  } else if (eventName === 'newChatMessage') {
    // user chat
    const { from } = data as NotificationNewMessage;

    mutate(getP2PUserChatEndpoint(from));
    mutate(getP2PUserChatUnreadEndpoint(from));
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
