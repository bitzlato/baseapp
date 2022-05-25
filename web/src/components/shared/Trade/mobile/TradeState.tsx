import { FC, useCallback, useState } from 'react';
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
};

export const MobileTradeState: FC<Props> = ({
  handlers: {
    handleActionConfirmTrade,
    handleActionDispute,
    handleActionAddtime,
    handleActionCancel,
    handleActionTips,
    handleActionPayment,
    handleActionConfirmPayment,
    handleTradeFeedback,
  },
  availableActions,
  showDetails,
  tradeSteps,
  targetTime,
  title,
  action,
  description,
}) => {
  const { t } = useTradeContext();
  const { trade } = useTradeContext();
  const { id } = trade;

  const [openChat, setOpenChat] = useState(false);

  const toggleChat = useCallback(() => setOpenChat((c) => !c), []);

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
              {t('Chat')}
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

        <Box px="5x" display="flex" flexDirection="row" gap="4x" alignItems="center">
          <Box display="flex" flexDirection="column" gap="1x">
            <Box as="span" color="tradeMainComponentTitle" fontSize="medium" fontWeight="strong">
              {description}
            </Box>
            <Box as="span" fontSize="medium" color="tradeMainComponentTitle">
              {action}
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" flex={1} gap="6x" alignItems="center">
            {trade.status === TradeStatus.TRADE_CREATED && trade.waitingTimeIncreased && (
              <Box w="18x" color="tradeMainComponentAdded10Minutes" textAlign="center">
                {t('trade.state.waitingTimeIncreased')}
              </Box>
            )}
            {availableActions.addtime && (
              <Button onClick={handleActionAddtime} variant="outlined" color="secondary">
                {t('trade.state.button.addtime')}
              </Button>
            )}

            {availableActions['confirm-trade'] && (
              <Button onClick={handleActionConfirmTrade}>
                {t('trade.state.button.confirm_trade')}
              </Button>
            )}
            {availableActions.dispute && (
              <Button onClick={handleActionDispute}>{t('trade.state.button.dispute')}</Button>
            )}
            {availableActions.tips && (
              <Button onClick={handleActionTips}>{t('trade.state.button.tips')}</Button>
            )}
            {availableActions.feedback && (
              <Box>
                <Box as="span" fontSize="lead" fontWeight="strong" color="tradeMainComponentTitle">
                  {t('trade.state.leave_feedback')}
                </Box>
                <Box display="flex" gap="2x" mt="1x">
                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    onClick={() => handleTradeFeedback('thumb_up')}
                  >
                    🙂
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    onClick={() => handleTradeFeedback('weary')}
                  >
                    😐
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    onClick={() => handleTradeFeedback('hankey')}
                  >
                    😖
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {showDetails && (
          <Box px="5x" gap="2x" mt="6x" display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection="column"
              gap="1x"
              color="tradeMainComponentTitle"
              backgroundColor="tradeMainComponentTradeCounterDetails"
              py="3x"
              px="6x"
              flex={1}
              borderRadius="1.5x"
            >
              <Box as="span" fontSize="caption">
                {t('trade.state.details', { paymethod: trade.paymethod.description })}
              </Box>
              <Box as="span" fontSize="medium">
                {trade.counterDetails}
              </Box>
            </Box>

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
