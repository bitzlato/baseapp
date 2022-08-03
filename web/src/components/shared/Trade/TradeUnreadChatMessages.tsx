import { FC } from 'react';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeStatus } from 'web/src/components/shared/Trade/types';
import { Badge } from 'web/src/components/ui/Badge';
import { useFetchP2PTradeChatUnread } from 'web/src/hooks/data/p2p/useFetchP2PTradeChatUnread';
import { useFetchP2PTradeDisputeUnread } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeUnread';

export const TradeUnreadChatMessages: FC = () => {
  const { trade } = useTradeContext();
  const { data: chatUnread = 0 } = useFetchP2PTradeChatUnread(trade.id);
  const { data: disputeChatUnread = 0 } = useFetchP2PTradeDisputeUnread(
    trade.status === TradeStatus.DISPUTE ? trade.id : undefined,
  );

  const unread = chatUnread + disputeChatUnread;

  return unread > 0 ? <Badge variant="danger">{unread}</Badge> : null;
};
