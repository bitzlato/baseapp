import { FC, useEffect } from 'react';
import {
  ChatMessageType,
  useFetchMessages,
  useFetchUnreadMessages,
  useMarkReadMessages,
  useSendMessage,
} from 'web/src/hooks/data/useUserChat';

import { ChatMessage } from 'web/src/components/shared/Chat/ChatMessage';
import { Chat } from 'web/src/components/shared/Chat/Chat';

interface UserChatProps {
  publicName: string;
}

export const UserChat: FC<UserChatProps> = ({ publicName }) => {
  const chatParams = {
    publicName,
    limit: 100,
  };

  const data = useFetchMessages(chatParams);
  const sendMessage = useSendMessage(chatParams);
  const unreadMessagesCount = useFetchUnreadMessages(chatParams);
  const markRead = useMarkReadMessages(publicName);

  const onSendMessage = async (message: string) => {
    return sendMessage({ message });
  };

  useEffect(() => {
    if (unreadMessagesCount > 0) {
      markRead();
    }
  }, [markRead, unreadMessagesCount]);

  const messages = data ? data.map((msg: ChatMessageType) => <ChatMessage {...msg} />) : null;

  return <Chat messages={messages} onSendMessage={onSendMessage} />;
};
