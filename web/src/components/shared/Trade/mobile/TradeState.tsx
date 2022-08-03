import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Stepper } from 'web/src/components/Stepper/Stepper';
import { TradeTimer } from 'web/src/components/shared/Trade/TradeTimer';
import {
  TradeAvailableAction,
  TradeFeedback,
  TradeStatus,
} from 'web/src/components/shared/Trade/types';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { Divider } from 'web/src/components/shared/Divider';
import { MobileTradeChat } from 'web/src/components/shared/Trade/mobile/TradeChat/TradeChat';
import { Text } from 'web/src/components/ui/Text';
import { TradeFeedback as TradeFeedbackComponent } from 'web/src/components/shared/Trade/TradeFeedback';
import { TradeUnreadChatMessages } from 'web/src/components/shared/Trade/TradeUnreadChatMessages';

type Props = {
  handlers: {
    handleActionConfirmTrade: () => void;
    handleActionDispute: () => void;
    handleActionAddtime: () => void;
    handleActionCancel: () => void;
    handleActionTips: () => void;
    handleActionPayment: () => void;
    handleActionConfirmPayment: () => void;
    handleTradeFeedback: (code: TradeFeedback) => void;
  };
  availableActions: { [key in TradeAvailableAction]: boolean };
  showDetails: string | false;
  tradeSteps: {
    key: string;
    content: JSX.Element;
    isCompleted: boolean;
  }[];
  targetTime: string | null;
  title: string;
  action: string;
  description: string;
  details: JSX.Element;
};

export const MobileTradeState: FC<Props> = ({
  handlers: {
    handleActionConfirmTrade,
    handleActionDispute,
    handleActionAddtime,
    handleActionCancel,
    handleActionPayment,
    handleActionConfirmPayment,
  },
  availableActions,
  showDetails,
  tradeSteps,
  targetTime,
  title,
  action,
  description,
  details,
}) => {
  const { t } = useTradeContext();
  const { trade } = useTradeContext();
  const { id } = trade;

  const [openChat, setOpenChat] = useState(false);

  const toggleChat = () => setOpenChat((c) => !c);

  const feedbackAndTips = (availableActions.tips || availableActions.feedback) && (
    <TradeFeedbackComponent tipsAvailable={availableActions.tips} />
  );

  return (
    <>
      <MobileTradeChat open={openChat} onClose={toggleChat} />
      <Box
        backgroundColor="tradeMainComponent"
        display="flex"
        flexDirection="column"
        gap="3x"
        py="5x"
      >
        <Box display="flex" flexDirection="column" pl="5x" pr="15x">
          <Box as="span" color="tradeMainComponentTitle" fontSize="lead">
            {title}
          </Box>
          <Box as="span" color="tradeMobileTradeId" fontSize="caption">
            {t('trade.state.num', { id })}
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" gap="4x" px="5x">
          {availableActions.cancel && (
            <Box flexGrow={2}>
              <Button color="danger" fullWidth onClick={handleActionCancel}>
                {t('trade.state.button.cancel')}
              </Button>
            </Box>
          )}

          <Box flexGrow={1}>
            <Button fullWidth onClick={toggleChat}>
              {t('Chat')}{' '}
              <Box as="span" ml="2x">
                <TradeUnreadChatMessages />
              </Box>
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          px="5x"
        >
          {targetTime && (
            <Box>
              <Box as="span" color="tradeMainComponentTitle" fontSize="lead30" fontWeight="strong">
                <TradeTimer targetTime={targetTime} />
              </Box>
            </Box>
          )}

          <Stepper direction="horizontal" steps={tradeSteps} />
        </Box>

        <Box px="5x" py="3x" display="flex" flexDirection="column" gap="1x">
          <Box as="span" color="tradeMainComponentTitle" fontSize="medium" fontWeight="strong">
            {description}
          </Box>
          <Box as="span" fontSize="medium" color="tradeMainComponentTitle">
            {action}
          </Box>
        </Box>

        <Box
          px="5x"
          display="flex"
          flexDirection="row"
          gap="6x"
          justifyContent="space-between"
          alignItems="center"
        >
          {trade.status === TradeStatus.TRADE_CREATED && trade.waitingTimeIncreased && (
            <Box
              borderColor="tradeMainComponentAdded10Minutes"
              borderWidth="1x"
              borderStyle="dashed"
              borderRadius="1x"
              py="1x"
              px="6x"
              textAlign="center"
              h="12x"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text as="span" variant="caption" color="tradeMainComponentAdded10Minutes">
                {t('trade.state.waitingTimeIncreased')}
              </Text>
            </Box>
          )}
          {availableActions.addtime && (
            <Button onClick={handleActionAddtime} variant="outlined" color="primary">
              {t('trade.state.button.addtime')}
            </Button>
          )}

          {availableActions['confirm-trade'] && (
            <Button onClick={handleActionConfirmTrade}>
              {t('trade.state.button.confirm_trade')}
            </Button>
          )}
          {availableActions.dispute && (
            <Button fullWidth onClick={handleActionDispute}>
              {t('trade.state.button.dispute')}
            </Button>
          )}
          {feedbackAndTips}
        </Box>
        {showDetails && (
          <Box px="5x" gap="2x" mt="6x" display="flex" flexDirection="column">
            {details}

            {availableActions.payment && (
              <Button fullWidth onClick={handleActionPayment}>
                {t('trade.state.button.payment')}
              </Button>
            )}

            {availableActions['confirm-payment'] && (
              <Button fullWidth onClick={handleActionConfirmPayment}>
                {t('trade.state.button.confirm_payment')}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
