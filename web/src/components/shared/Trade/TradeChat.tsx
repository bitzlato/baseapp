import { FC, useEffect, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Chat } from 'web/src/components/shared/Chat/Chat';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeStatus } from 'web/src/components/shared/Trade/types';
import { FetchError } from 'web/src/helpers/fetch';
import { useFetchP2PTradeChat } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { useFetchP2PTradeChatUnread } from 'web/src/hooks/data/p2p/useFetchP2PTradeChatUnread';
import { useFetchP2PTradeDispute } from 'web/src/hooks/data/p2p/useFetchP2PTradeDispute';
import { useFetchP2PTradeDisputeUnread } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeUnread';
import { useP2PMarkReadTradeChat } from 'web/src/hooks/mutations/useP2PMarkReadTradeChat';
import { useP2PMarkReadTradeDispute } from 'web/src/hooks/mutations/useP2PMarkReadTradeDispute';
import { useP2PSendTradeChatFile } from 'web/src/hooks/mutations/useP2PSendTradeChatFile';
import { useP2PSendTradeChatMessage } from 'web/src/hooks/mutations/useP2PSendTradeChatMessage';
import { useP2PSendTradeDisputeFile } from 'web/src/hooks/mutations/useP2PSendTradeDisputeFile';
import { useP2PSendTradeDisputeMessage } from 'web/src/hooks/mutations/useP2PSendTradeDisputeMessage';
import * as s from './TradeChat.css';

const CODE_ERRORS_TRANS = [
  'ChatIsNotAvailable',
  'NotEnoughRatingForChatMessageWithDigits',
  'RequisitesNotAllowed',
];

export const TradeChat: FC = () => {
  const t = useSharedT();
  const { trade } = useTradeContext();
  const isDispute = trade.status === TradeStatus.DISPUTE;
  const { data: { data: messages } = {} } = useFetchP2PTradeChat(trade.id);
  const { data: unread } = useFetchP2PTradeChatUnread(trade.id);
  const { data: { data: disputeMessages } = {} } = useFetchP2PTradeDispute(
    isDispute ? trade.id : undefined,
  );
  const { data: disputeUnread } = useFetchP2PTradeDisputeUnread(isDispute ? trade.id : undefined);
  const [sendTradeChatMessage, { error: errorSendMessage, reset: handleChatErrorClose }] =
    useP2PSendTradeChatMessage();
  const [
    sendTradeDisputeMessage,
    { error: errorSendDisputeMessage, reset: handleDisputeErrorClose },
  ] = useP2PSendTradeDisputeMessage();
  const [sendTradeChatFile, { error: errorSendFile, reset: handleChatFileErrorClose }] =
    useP2PSendTradeChatFile();
  const [
    sendTradeDisputeFile,
    { error: errorSendDisputeFile, reset: handleDisputeFileErrorClose },
  ] = useP2PSendTradeDisputeFile();
  const [markReadChat] = useP2PMarkReadTradeChat();
  const [markReadDispute] = useP2PMarkReadTradeDispute();

  const disputeMessagesSorted = useMemo(
    () =>
      disputeMessages ? [...disputeMessages].sort((a, b) => a.created - b.created) : undefined,
    [disputeMessages],
  );

  useEffect(() => {
    if (unread && unread > 0) {
      markReadChat(trade.id);
    }

    if (disputeUnread && disputeUnread > 0) {
      markReadDispute(trade.id);
    }
  }, [disputeUnread, markReadChat, markReadDispute, trade.id, unread]);

  const error = errorSendMessage ?? errorSendDisputeMessage;
  let errorText;
  if (error instanceof FetchError) {
    errorText =
      'code' in error.payload && CODE_ERRORS_TRANS.includes(error.payload.code)
        ? t(`error.${error.payload.code}`)
        : error.message;
  }

  const handleSendMessage = (message: string) => {
    if (isDispute) {
      return sendTradeDisputeMessage({ tradeId: trade.id, message });
    }

    return sendTradeChatMessage({ tradeId: trade.id, message });
  };

  const handleSendFile = (file: File) => {
    if (isDispute) {
      return sendTradeDisputeFile({ tradeId: trade.id, file });
    }

    return sendTradeChatFile({ tradeId: trade.id, file });
  };

  const handleErrorClose = () => {
    if (errorSendMessage) {
      handleChatErrorClose();
    }
    if (errorSendDisputeMessage) {
      handleDisputeErrorClose();
    }
    if (errorSendFile) {
      handleChatFileErrorClose();
    }
    if (errorSendDisputeFile) {
      handleDisputeFileErrorClose();
    }
  };

  return (
    <Box className={s.chat}>
      <Chat
        messages={messages}
        disputeMessages={disputeMessagesSorted}
        unread={disputeUnread ?? unread}
        error={errorText}
        readOnly={
          trade.status === TradeStatus.CANCEL || trade.status === TradeStatus.CONFIRM_PAYMENT
        }
        canSendFiles
        onTextSend={handleSendMessage}
        onFileSend={handleSendFile}
        onErrorClose={handleErrorClose}
      />
    </Box>
  );
};
