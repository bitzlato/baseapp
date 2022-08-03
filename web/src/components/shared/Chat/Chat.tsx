import { FC, useEffect, useRef } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { ChatMessage } from 'web/src/types/chat.types';
import { ChatMessages } from 'web/src/components/shared/Chat/ChatMessages';
import { ChatDisputeLabel } from 'web/src/components/shared/Chat/ChatDisputeLabel';
import { ChatDisputeDivider } from 'web/src/components/shared/Chat/ChatDisputeDivider';
import { ChatControls } from 'web/src/components/shared/Chat/ChatControls';
import { ChatError } from 'web/src/components/shared/Chat/ChatError';

export interface Props {
  messages?: ChatMessage[] | undefined;
  disputeMessages?: ChatMessage[] | undefined;
  unread?: number | undefined;
  error?: string | undefined;
  readOnly?: boolean | undefined;
  canSendFiles?: boolean | undefined;
  onFileSend?: ((file: File) => void) | undefined;
  onTextSend?: ((message: string) => void) | undefined;
  onErrorClose?: (() => void) | undefined;
}

export const Chat: FC<Props> = ({
  messages,
  disputeMessages,
  unread = 0,
  error,
  readOnly = false,
  canSendFiles,
  onTextSend,
  onFileSend,
  onErrorClose,
}) => {
  const t = useSharedT();
  const firstScrollRef = useRef(true);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const unreadMessageRef = useRef<HTMLDivElement>(null);

  const isDispute = disputeMessages !== undefined;

  // Scroll to unread message or bottom
  useEffect(() => {
    if (firstScrollRef.current === true && unreadMessageRef.current && messageBoxRef.current) {
      messageBoxRef.current.scrollTop = unreadMessageRef.current.offsetTop;

      firstScrollRef.current = false;
    } else if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages?.length, disputeMessages?.length]);

  let body = null;
  if (!messages && !disputeMessages) {
    body = (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        <Spinner />
      </Box>
    );
  } else if (messages && messages.length === 0 && disputeMessages && disputeMessages.length === 0) {
    body = (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        m="2x"
      >
        <Text textAlign="center">{t('Please Send message for start conversation')}</Text>
      </Box>
    );
  } else {
    body = (
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {isDispute && <ChatDisputeLabel label={t('trade.chat.dispute.label')} />}
        <Box
          ref={messageBoxRef}
          position="relative"
          overflowY="auto"
          display="flex"
          flexGrow={1}
          tabIndex={error ? -1 : undefined}
        >
          <Box display="flex" flexDirection="column" position="absolute" width="full" p="2x">
            {messages && (
              <ChatMessages
                messages={messages}
                unreadMessageRef={!isDispute ? unreadMessageRef : undefined}
                unread={unread}
              />
            )}
            {isDispute && (
              <>
                <ChatDisputeDivider label={t('trade.chat.dispute.open')} />
                {disputeMessages && (
                  <ChatMessages
                    messages={disputeMessages}
                    unreadMessageRef={unreadMessageRef}
                    unread={unread}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      overflow="hidden"
      display="flex"
      flexGrow={1}
      flexDirection="column"
      borderWidth="1x"
      borderColor="traderBorder"
      borderStyle="solid"
      borderRadius="1.5x"
    >
      {body}

      {!readOnly && (
        <ChatControls
          disabled={error !== undefined}
          canSendFiles={canSendFiles}
          onTextSend={onTextSend}
          onFileSend={onFileSend}
        />
      )}

      {error && <ChatError onClose={onErrorClose}>{error}</ChatError>}
    </Box>
  );
};
