import { FC, useEffect } from 'react';
import { Chat } from 'web/src/components/shared/Chat/Chat';
import { useFetchP2PUserChat } from 'web/src/hooks/data/p2p/useFetchP2PUserChat';
import { useFetchP2PUserChatUnread } from 'web/src/hooks/data/p2p/useFetchP2PUserChatUnread';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useP2PSendUserChatMessage } from 'web/src/hooks/mutations/useP2PSendUserChatMessage';
import { FetchError } from 'web/src/helpers/fetch';
import { useP2PMarkReadUserChat } from 'web/src/hooks/mutations/useP2PMarkReadUserChat';

interface UserChatProps {
  publicName: string;
  available?: boolean | undefined;
}

export const UserChat: FC<UserChatProps> = ({ publicName, available = true }) => {
  const t = useSharedT();
  const { data: { data: messages } = {} } = useFetchP2PUserChat(publicName);
  const { data: unread } = useFetchP2PUserChatUnread(publicName);
  const [sendMessage, { error, reset: handleChatErrorClose }] = useP2PSendUserChatMessage();
  const [markRead] = useP2PMarkReadUserChat();

  let errorText;
  if (error instanceof FetchError) {
    errorText = 'code' in error.payload ? t(`error.${error.payload.code}`) : error.message;
  }

  const handleSendMessage = (message: string) =>
    sendMessage({ userPublicName: publicName, message });

  useEffect(() => {
    if (unread && unread > 0) {
      markRead(publicName);
    }
  }, [markRead, publicName, unread]);

  return (
    <Chat
      messages={messages}
      unread={unread}
      error={!available ? t('trader.chatUnavailable') : errorText}
      onTextSend={handleSendMessage}
      onErrorClose={available ? handleChatErrorClose : undefined}
    />
  );
};
