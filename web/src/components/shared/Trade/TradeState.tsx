import { FC } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { AdsType, TradeStatus } from 'web/src/components/shared/Trade/types';
import { useTradeAction, useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeTimer } from 'web/src/components/shared/Trade/TradeTimer';
import { useAppContext } from 'web/src/components/app/AppContext';
import { MobileTradeState } from 'web/src/components/shared/Trade/mobile/TradeState';
import { Stepper } from 'web/src/components/Stepper/Stepper';
import { Text } from 'web/src/components/ui/Text';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { writeTextToClipboard } from 'web/src/helpers/writeTextToClipboard';
import { CollapsibleText } from 'web/src/components/shared/CollapsibleText/CollapsibleText';
import { TradeFeedback } from './TradeFeedback';

const MINUTES_TO_ADD = 10;
const MINUTES_TILL_TIMEOUT = 10;

export const TradeState: FC = () => {
  const { t, formattedTradeValues } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  const { trade, toggleModal, handleTradeTimeout, handleTradeFeedback } = useTradeContext();
  const tradeAction = useTradeAction();
  const { id, partner, type } = trade;

  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const cryptocurrency = getCryptoCurrency(trade.cryptocurrency.code);
  const cryptoMoney = createMoney(trade.cryptocurrency.amount, cryptocurrency);

  const handleActionConfirmTrade = () => tradeAction('confirm-trade');
  const handleActionDispute = () => toggleModal('disputeReason');

  const handleActionAddtime = () => handleTradeTimeout();

  const handleActionCancel = () => {
    toggleModal('confirmCancel');
  };

  const handleActionTips = () => {
    toggleModal('tips');
  };

  const handleActionPayment = () => {
    tradeAction('payment');
  };

  const handleActionConfirmPayment = () => {
    toggleModal('confirmPayment');
  };

  const availableActions = (() => {
    const a = {
      cancel: false,
      tips: false,
      dispute: false,
      addtime: false,
      'confirm-trade': false,
      payment: false,
      'confirm-payment': false,
      feedback: false,
    };

    trade.availableActions.forEach((action) => {
      a[action] = true;
    });

    return a;
  })();

  const tradeDetails = trade.details || trade.counterDetails;

  const showDetails =
    [
      TradeStatus.CONFIRM_TRADE,
      TradeStatus.PAYMENT,
      TradeStatus.CONFIRM_PAYMENT,
      TradeStatus.DISPUTE,
    ].includes(trade.status) && tradeDetails;

  const tradeSteps = (() => {
    const step1 = {
      key: '1',
      content: (
        <Text as="span" color="tradeHistoryCircleContentColorActive">
          1
        </Text>
      ),
      isCompleted: true,
    };

    const isTradeActive = trade.status !== TradeStatus.TRADE_CREATED;

    const step2 = {
      key: '2',
      content: (
        <Text
          as="span"
          color={
            isTradeActive
              ? 'tradeHistoryCircleContentColorActive'
              : 'tradeHistoryCircleContentColor'
          }
        >
          2
        </Text>
      ),
      isCompleted: isTradeActive,
    };

    const isTradeFinished =
      trade.status === TradeStatus.CANCEL || trade.status === TradeStatus.CONFIRM_PAYMENT;

    const step3 = {
      key: '3',
      content: (
        <Text
          as="span"
          color={
            isTradeFinished
              ? 'tradeHistoryCircleContentColorActive'
              : 'tradeHistoryCircleContentColor'
          }
        >
          3
        </Text>
      ),
      isCompleted: isTradeFinished,
    };

    return [step1, step2, step3];
  })();

  const targetTime = trade.times.autocancel || trade.times.dispute; // '2022-07-05T20:30:48.374Z';

  const isBuy = type === AdsType.purchase;
  const tradeType = isBuy ? t('trade.state.type.purchase') : t('trade.state.type.selling');

  const currencies = `${cryptoMoney.currency.code} ${t('trade.state.for')} ${trade.currency.code}`;

  const atUser = isBuy
    ? t('trade.state.atUser', { name: partner.name })
    : t('trade.state.toUser', { name: partner.name });
  const viaPaymethod = t('trade.state.viaPaymethod', { paymethod: trade.paymethod.description });

  const title = [tradeType, currencies, atUser, viaPaymethod].join(' ');

  const action = (() => {
    if (trade.status === TradeStatus.TRADE_CREATED && trade.owner) {
      if (trade.waitingTimeIncreased) {
        return t('trade.state.purchase.trade_created.owner.subtitle', {
          minutes: MINUTES_TILL_TIMEOUT + MINUTES_TO_ADD,
        });
      }

      return t('trade.state.purchase.trade_created.owner.subtitle', {
        minutes: MINUTES_TILL_TIMEOUT,
      });
    }
    return t(`trade.state.${type}.${trade.status}.subtitle`, {
      name: partner.name,
      code: trade.currency.code,
      amount: formattedTradeValues.currency,
      camount: formattedTradeValues.cryptocurrency,
      ccode: trade.cryptocurrency.code,
      minutes: trade.waitingTimeIncreased
        ? MINUTES_TILL_TIMEOUT + MINUTES_TO_ADD
        : MINUTES_TILL_TIMEOUT,
    });
  })();

  const description = (() => {
    if (trade.status === TradeStatus.TRADE_CREATED && trade.owner) {
      return t('trade.state.purchase.trade_created.owner.title', {
        minutes: MINUTES_TILL_TIMEOUT,
      });
    }

    return t(`trade.state.${type}.${trade.status}.title`, {
      name: partner.name,
      code: trade.currency.code,
      amount: formattedTradeValues.currency,
      minutes: MINUTES_TILL_TIMEOUT,
    });
  })();

  const details = (
    <Box
      display="flex"
      flexDirection="column"
      gap="1x"
      color="tradeMainComponentTitle"
      backgroundColor="tradeMainComponentTradeCounterDetailsBackground"
      p="4x"
      borderRadius="1.5x"
      flexGrow={1}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text
          as="span"
          fontWeight="strong"
          fontSize="lead"
          color="tradeMainComponentTradeCounterDetailsColor"
        >
          {t('trade.state.details', { paymethod: trade.paymethod?.description || '' })}
        </Text>

        <IconButton onClick={() => writeTextToClipboard(tradeDetails)} title="copy">
          <CopyIcon />
        </IconButton>
      </Box>

      <CollapsibleText
        controlColor="collapsibleTextExpandControls"
        text={tradeDetails}
        textColor="tradeMainComponentTradeCounterDetailsColor"
        fontSize={isMobileDevice ? 'medium' : 'large'}
      />
    </Box>
  );

  if (isMobileDevice) {
    return (
      <MobileTradeState
        handlers={{
          handleActionConfirmTrade,
          handleActionDispute,
          handleActionAddtime,
          handleActionCancel,
          handleActionTips,
          handleActionPayment,
          handleActionConfirmPayment,
          handleTradeFeedback,
        }}
        tradeSteps={tradeSteps}
        availableActions={availableActions}
        showDetails={showDetails}
        targetTime={targetTime}
        title={title}
        action={action}
        description={description}
        details={details}
      />
    );
  }

  const feedbackAndTips = (availableActions.tips || availableActions.feedback) && (
    <TradeFeedback tipsAvailable={availableActions.tips} />
  );

  return (
    <Box backgroundColor="tradeMainComponent" px="6x" py="8x" borderRadius="1.5x">
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="1x">
        <Text as="span" color="tradeMainComponentTitle" fontSize="lead30">
          {title}
        </Text>

        {availableActions.cancel && (
          <Box>
            <Button fullWidth color="danger" onClick={handleActionCancel}>
              {t('trade.state.button.cancel')}
            </Button>
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="row" gap="1x" mb="8x" mt="6x">
        <Stepper steps={tradeSteps} direction="horizontal" />
        <Box
          backgroundColor="tradeMainComponentTradeLabel"
          borderRadius="circle"
          paddingLeft="3x"
          paddingRight="3x"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="span" color="tradeMainComponentTitle">
            {t('trade.state.num', { id })}
          </Text>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" gap="4x" alignItems="center">
        {targetTime && (
          <Box>
            <Text as="span" color="tradeMainComponentTitle" fontSize="lead30" fontWeight="strong">
              <TradeTimer targetTime={targetTime} />
            </Text>
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap="1x" flex={1}>
          <Text as="span" color="tradeMainComponentTitle" fontSize="lead24" fontWeight="strong">
            {description}
          </Text>
          <Text as="span" color="tradeMainComponentTitle">
            {action}
          </Text>
        </Box>

        <Box display="flex" justifyContent="flex-end" flex={1} gap="6x" alignItems="center">
          {trade.status === TradeStatus.TRADE_CREATED && trade.waitingTimeIncreased && (
            <Box w="18x" color="tradeMainComponentAdded10Minutes" textAlign="center">
              {t('trade.state.waitingTimeIncreased')}
            </Box>
          )}
          {availableActions.addtime && (
            <Button onClick={handleActionAddtime} variant="outlined" color="primary">
              {t('trade.state.button.addtime')}
            </Button>
          )}

          {availableActions['confirm-trade'] && (
            <Button
              data-gtm-click={isBuy ? 'finish_deal_buy' : 'finish_deal_sell'}
              onClick={handleActionConfirmTrade}
            >
              {t('trade.state.button.confirm_trade')}
            </Button>
          )}
          {availableActions.dispute && (
            <Button onClick={handleActionDispute}>{t('trade.state.button.dispute')}</Button>
          )}
          {feedbackAndTips}
        </Box>
      </Box>

      {showDetails && (
        <Box gap="2x" mt="6x" display="flex">
          {details}

          {availableActions.payment && (
            <Box
              flexShrink={0}
              py="3x"
              pl="6x"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Button fullWidth onClick={handleActionPayment}>
                {t('trade.state.button.payment')}
              </Button>
            </Box>
          )}

          {availableActions['confirm-payment'] && (
            <Box flexShrink={0} py="3x" px="6x">
              <Button fullWidth onClick={handleActionConfirmPayment}>
                {t('trade.state.button.confirm_payment')}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
