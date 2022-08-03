import { FC } from 'react';
import { Badge } from 'web/src/components/ui/Badge';
import { useFetchP2PUserChatUnread } from 'web/src/hooks/data/p2p/useFetchP2PUserChatUnread';

interface Props {
  publicName: string;
}

export const UserUnreadChatMessages: FC<Props> = ({ publicName }: Props) => {
  const { data: unread = 0 } = useFetchP2PUserChatUnread(publicName);

  return unread > 0 ? <Badge variant="danger">{unread}</Badge> : null;
};
