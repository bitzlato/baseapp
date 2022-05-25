import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Chat } from 'web/src/components/shared/Chat/Chat';
import { ChatMessage } from 'web/src/components/shared/Chat/ChatMessage';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeStatus } from 'web/src/components/shared/Trade/types';

const RedLine = () => <Box backgroundColor="tradeDisputeDivider" w="full" h="0.5x" />;

const DisputeDivider: FC<{ label: string }> = ({ label }) => (
  <Box height="10x" display="flex" alignItems="center">
    <Box w="full" display="flex" alignItems="center" justifyContent="center">
      <RedLine />
    </Box>
    <Box w="full" display="flex" alignItems="center" justifyContent="center">
      <Box as="span" fontSize="medium" color="tradeDisputeDivider">
        {label}
      </Box>
    </Box>
    <Box w="full" display="flex" alignItems="center" justifyContent="center">
      <RedLine />
    </Box>
  </Box>
);

const DisputeLabel: FC<{ label: string }> = ({ label }) => (
  <Box textAlign="center" py="4x" backgroundColor="tradeDisputeLabelBackground">
    <Box as="span" color="tradeDisputeLabelColor" fontSize="medium" fontWeight="strong">
      {label}
    </Box>
  </Box>
);

export const TradeChat: FC = () => {
  const { t } = useTradeContext();
  const { chat, disputeChat, trade } = useTradeContext();

  const isDispute = trade.status === TradeStatus.DISPUTE;

  const tradeMessages = chat.messages.map((message) => (
    <ChatMessage key={message.id} {...message} file="null" />
  ));

  const disputeStartDivider = <DisputeDivider label={t('trade.chat.dispute.open')} />;
  const disputeLabel = <DisputeLabel label={t('trade.chat.dispute.label')} />;

  const disputeMessages = disputeChat.messages.map((message) => (
    <ChatMessage key={message.id} {...message} file="null" />
  ));

  const messages = isDispute
    ? [disputeLabel, ...tradeMessages, disputeStartDivider, ...disputeMessages]
    : tradeMessages;

  const { handleTradeSendMessage } = chat;
  const { handleTradeSendDisputeMessage } = disputeChat;

  const handleSendMessage = async (message: string) => {
    if (isDispute) {
      handleTradeSendDisputeMessage(message);
    } else {
      handleTradeSendMessage(message);
    }
  };

  const isSending = chat.isLoading || disputeChat.isLoading;

  return <Chat messages={messages} isSending={isSending} onSendMessage={handleSendMessage} />;
};
