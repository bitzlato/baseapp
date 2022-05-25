import { FC, useCallback, useMemo } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { AdsType, TradeStatus } from 'web/src/components/shared/Trade/types';
import { useTradeAction, useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeTimer } from 'web/src/components/shared/Trade/TradeTimer';
import { useAppContext } from 'web/src/components/app/AppContext';
import { MobileTradeState } from 'web/src/components/shared/Trade/mobile/TradeState';
import { Stepper } from 'web/src/components/Stepper/Stepper';
import { Text } from 'web/src/components/ui/Text';

export const TradeState: FC = () => {
  const { t } = useTradeContext();
  const { isMobileDevice } = useAppContext();

  const { trade, toggleModal, handleTradeTimeout, handleTradeFeedback } = useTradeContext();
  const tradeAction = useTradeAction();
  const { id, partner, type } = trade;

  const handleActionConfirmTrade = useCallback(() => tradeAction('confirm-trade'), [tradeAction]);
  const handleActionDispute = useCallback(() => tradeAction('dispute'), [tradeAction]);
  const handleActionAddtime = useCallback(() => handleTradeTimeout(), [handleTradeTimeout]);

  const handleActionCancel = useCallback(() => {
    toggleModal('confirmPayment');
  }, [toggleModal]);

  const handleActionTips = useCallback(() => {
    toggleModal('tips');
  }, [toggleModal]);

  const handleActionPayment = useCallback(() => {
    tradeAction('payment');
  }, [tradeAction]);

  const handleActionConfirmPayment = useCallback(() => {
    toggleModal('confirmPayment');
  }, [toggleModal]);

  const availableActions = useMemo(() => {
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
  }, [trade.availableActions]);

  const showDetails = useMemo(() => {
    return (
      [
        TradeStatus.CONFIRM_TRADE,
        TradeStatus.PAYMENT,
        TradeStatus.CONFIRM_PAYMENT,
        TradeStatus.DISPUTE,
      ].includes(trade.status) && trade.details
    );
  }, [trade.status, trade.details]);

  const tradeSteps = useMemo(
    () => [
      { key: '1', content: <Text as="span">1</Text>, isCompleted: true },
      { key: '2', content: <Text as="span">2</Text>, isCompleted: true },
      { key: '3', content: <Text as="span">3</Text>, isCompleted: true },
    ],
    [],
  );

  const targetTime = trade.times.autocancel || trade.times.dispute; // || '2022-06-16T20:30:48.374Z';

  const title = useMemo<string>(() => {
    const tradeType =
      type === AdsType.purchase ? t('trade.state.type.purchase') : t('trade.state.type.selling');

    const currencies = `${trade.cryptocurrency.code} ${t('trade.state.for')} ${
      trade.currency.code
    }`;

    const atUser = t('trade.state.atUser', { name: partner.name });
    const viaPaymethod = t('trade.state.viaPaymethod', { paymethod: trade.paymethod.description });

    return [tradeType, currencies, atUser, viaPaymethod].join(' ');
  }, [
    t,
    trade.cryptocurrency.code,
    trade.currency.code,
    partner.name,
    trade.paymethod.description,
    type,
  ]);

  const action = useMemo(() => {
    const tradeStatus = trade.status;

    return t(`trade.state.${type}.${tradeStatus}.subtitle`, {
      name: partner.name,
      code: trade.currency.code,
      amount: trade.currency.amount,
      camount: trade.cryptocurrency.amount,
      ccode: trade.cryptocurrency.code,
    });
  }, [partner.name, t, trade.currency, trade.cryptocurrency, trade.status, type]);

  const description = useMemo(() => {
    const tradeStatus = trade.status;
    return t(`trade.state.${type}.${tradeStatus}.title`, {
      name: partner.name,
      code: trade.currency.code,
      amount: trade.currency.amount,
    });
  }, [partner.name, t, trade.currency, trade.status, type]);

  const isSelling = useMemo(() => trade.type === AdsType.selling, [trade.type]);

  const mobileProps = useMemo(() => {
    if (isMobileDevice) {
      return {
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
        tradeSteps,
        availableActions,
        showDetails,
        targetTime,
        title,
        action,
        description,
      };
    }

    return null;
  }, [
    isMobileDevice,
    handleActionConfirmTrade,
    handleActionDispute,
    handleActionAddtime,
    handleActionCancel,
    handleActionTips,
    handleActionPayment,
    handleActionConfirmPayment,
    handleTradeFeedback,
    availableActions,
    showDetails,
    targetTime,
    title,
    action,
    description,
    tradeSteps,
  ]);

  if (isMobileDevice && mobileProps) {
    return <MobileTradeState {...mobileProps} />;
  }

  return (
    <Box backgroundColor="tradeMainComponent" px="6x" py="8x" borderRadius="1.5x">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text as="span" color="tradeMainComponentTitle" fontSize="lead30">
          {title}
        </Text>
        {availableActions.cancel && (
          <Button color="danger" onClick={handleActionCancel}>
            {t('trade.state.button.cancel')}
          </Button>
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

        <Box display="flex" flexDirection="column" gap="1x">
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
              <Text as="span" fontSize="lead" fontWeight="strong" color="tradeMainComponentTitle">
                {t('trade.state.leave_feedback')}
              </Text>
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
          {availableActions['confirm-payment'] && (
            <Box py="3x" px="6x">
              <Button fullWidth onClick={handleActionConfirmPayment}>
                {t('trade.state.button.confirm_payment')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {showDetails && !isSelling && (
        <Box gap="2x" mt="6x" display="flex">
          <Box
            display="flex"
            flexDirection="column"
            gap="1x"
            color="tradeMainComponentTitle"
            backgroundColor="tradeMainComponentTradeCounterDetails"
            py="3x"
            px="6x"
            flex={1}
          >
            <Text as="span" fontWeight="strong" fontSize="lead">
              {t('trade.state.details', { paymethod: trade.paymethod?.description || '' })}
            </Text>
            <Text as="span" fontSize="lead">
              {trade.counterDetails}
            </Text>
          </Box>

          {availableActions.payment && (
            <Box
              py="3x"
              px="6x"
              backgroundColor="tradeMainComponentTradeCounterDetails"
              flexGrow={0.5}
            >
              <Button fullWidth onClick={handleActionPayment}>
                {t('trade.state.button.payment')}
              </Button>
            </Box>
          )}

          {availableActions['confirm-payment'] && (
            <Box
              py="3x"
              px="6x"
              backgroundColor="tradeMainComponentTradeCounterDetails"
              flexGrow={0.5}
            >
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
