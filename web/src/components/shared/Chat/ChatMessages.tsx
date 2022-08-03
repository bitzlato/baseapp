import { FC } from 'react';
import { ChatMessageBox } from 'web/src/components/shared/Chat/ChatMessageBox';
import { ChatMessage } from 'web/src/types/chat.types';

const CLOSE_TIME_INTERVAL = 2 * 60 * 1000; // 2 min

interface Props {
  messages: ChatMessage[];
  unreadMessageRef?: React.RefObject<HTMLDivElement> | undefined;
  unread?: number | undefined;
}

export const ChatMessages: FC<Props> = ({ messages, unreadMessageRef, unread = 0 }) => {
  const unreadIdx = unread > 0 ? Math.max(messages.length - unread, 0) : messages.length - 1;

  return (
    <>
      {messages.map((message, idx) => {
        const prevMessage = idx > 0 ? messages[idx - 1] : undefined;
        const isCloseToPrev =
          prevMessage &&
          prevMessage.type === message.type &&
          message.created - prevMessage.created < CLOSE_TIME_INTERVAL;

        return (
          <ChatMessageBox
            messageRef={idx === unreadIdx ? unreadMessageRef : undefined}
            key={message.id}
            message={message}
            hiddenTime={isCloseToPrev}
          />
        );
      })}
    </>
  );
};
