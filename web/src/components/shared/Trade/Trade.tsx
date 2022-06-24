import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { TradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeCurrencies } from 'web/src/components/shared/Trade/TradeCurrencies';
import { TradeHistory } from 'web/src/components/shared/Trade/TradeHistory';
import { TradeInfo } from 'web/src/components/shared/Trade/TradeInfo';
import { TradePartnerShort } from 'web/src/components/shared/Trade/TradePartnerShort';
import { TradeState } from 'web/src/components/shared/Trade/TradeState';
import { TradeTerms } from 'web/src/components/shared/Trade/TradeTerms';
import { TradeTipsModal } from 'web/src/components/shared/Trade/TradeModals/TradeTipsModal';
import {
  Trade,
  TradeAvailableAction,
  TradeFeedback,
  TradeModals,
  TradeStatus,
} from 'web/src/components/shared/Trade/types';
import { useAppContext, useLanguage, useTheme } from 'src/components/app/AppContext';
import { MobileTrade } from 'web/src/components/shared/Trade/mobile/Trade';
import { TradeCancelModal } from 'web/src/components/shared/Trade/TradeModals/TradeCancelModal';
import { TradeInputDetails } from 'web/src/components/shared/Trade/TradeInputDetails';
import { TradeConfirmReceiveMoneyModal } from 'web/src/components/shared/Trade/TradeModals/TradeConfirmReceiveMoneyModal';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import { useAdapterContext, useSharedT } from 'web/src/components/shared/Adapter';
import {
  useFetchTradeChat,
  useFetchTradeDisputeChat,
  useFetchTradeInfo,
} from 'web/src/hooks/data/useFetchTrade';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import {
  useTradeFeedback,
  useTradeSendDisputeMessage,
  useTradeSendMessage,
  useTradeTimeout,
  useTradeTips,
  useTradeUpdateDetails,
  useTradeUpdateState,
} from 'web/src/hooks/mutations/useTradeUpdateState';
import { useTrustUser } from 'web/src/hooks/mutations/useTrustUser';
import { TradeDetails } from './TradeDetails';

export const SharedTrade: FC = () => {
  const t = useSharedT();
  const { isMobileDevice } = useAppContext();
  const { params } = useAdapterContext<{ tradeId: string | undefined }>();

  const { tradeId } = params;

  const theme = useTheme();
  const [askTradeDetails, setAskTradeDetails] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [tips, setTips] = useState(false);

  const gap = '3x';
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  const modals: { [key in TradeModals]: boolean } = useMemo(
    () => ({
      details: askTradeDetails,
      confirmCancel,
      confirmPayment,
      tips,
    }),
    [askTradeDetails, confirmCancel, confirmPayment, tips],
  );

  const toggleModal = useCallback((modal: TradeModals) => {
    let toggler: Dispatch<SetStateAction<boolean>> | null = null;

    if (modal === 'details') {
      toggler = setAskTradeDetails;
    }

    if (modal === 'confirmCancel') {
      toggler = setConfirmCancel;
    }

    if (modal === 'confirmPayment') {
      toggler = setConfirmPayment;
    }

    if (modal === 'tips') {
      toggler = setTips;
    }

    if (toggler) {
      toggler((c) => !c);
    }
  }, []);

  const lang = useLanguage();

  const { data: tradeInfo, mutate: reloadTrade } = useFetchTradeInfo(tradeId);

  const partnerSWR = useFetchTraderInfo(tradeInfo?.partner);

  const { data: paymethod } = useFetchPaymethod(tradeInfo?.currency.paymethod, lang);

  const trade = useMemo(
    () => ({
      ...(tradeInfo as Trade),
      partner: { ...(partnerSWR.data as UserInfo) },
      paymethod: paymethod as PaymethodSource,
    }),
    [tradeInfo, partnerSWR.data, paymethod],
  );

  const {
    data: chat,
    isValidating: tradeChatLoading,
    mutate: reloadTradeChat,
  } = useFetchTradeChat(tradeId);

  const {
    data: disputeChat,
    isValidating: tradeDisputeChatLoading,
    mutate: reloadTradeDisputeChat,
  } = useFetchTradeDisputeChat(
    trade && trade.id && trade.status === TradeStatus.DISPUTE ? tradeId : undefined,
  );

  const [mutateTradeState] = useTradeUpdateState({
    reloadTrade,
    toggleDetailsModal: () => toggleModal('details'),
  });

  const [mutateTradeTimeout] = useTradeTimeout({ reloadTrade });

  const [mutateTradeDetails] = useTradeUpdateDetails({
    toggleDetailsModal: () => toggleModal('details'),
  });

  const [mutateTradeTips] = useTradeTips({
    reloadTrade,
    toggleTipsModal: () => toggleModal('tips'),
  });

  const [mutateTradeChat] = useTradeSendMessage({ reloadTradeChat });
  const [mutateTradeDisputeChat] = useTradeSendDisputeMessage({ reloadTradeDisputeChat });
  const [mutateTradeFeedback] = useTradeFeedback({ onSuccess: reloadTrade });

  const trustUser = useTrustUser(partnerSWR);

  const handleTrustUser = useCallback(
    (flag: boolean, publicName: string) => trustUser({ flag, publicName }),
    [trustUser],
  );

  const handleTradeAction = useCallback(
    (action: TradeAvailableAction) => {
      if (trade.id) {
        mutateTradeState({ tradeId: trade.id, action, twoFACode: null });
      }
    },
    [trade.id, mutateTradeState],
  );

  const handleTradeDetails = useCallback(
    (details: string, onSuccess?: () => void) => {
      if (trade.id) {
        mutateTradeDetails({ tradeId: trade.id, details }).then(() => onSuccess?.());
      }
    },
    [trade.id, mutateTradeDetails],
  );

  const handleTradeTimeout = useCallback(() => {
    if (trade.id) {
      mutateTradeTimeout({ tradeId: trade.id });
    }
  }, [trade.id, mutateTradeTimeout]);

  const handleTradeTips = useCallback(
    (tipsAmount: number) => {
      if (trade.id) {
        mutateTradeTips({
          tradeId: trade.id,
          cryptocurrency: trade.cryptocurrency?.code,
          amountPercent: tipsAmount,
        });
      }
    },
    [trade.id, trade.cryptocurrency?.code, mutateTradeTips],
  );

  const handleTradeSendMessage = useCallback(
    async (message: string) => {
      if (trade.id) {
        await mutateTradeChat({ tradeId: trade.id, message });
      }
    },
    [trade.id, mutateTradeChat],
  );

  const handleTradeSendDisputeMessage = useCallback(
    async (message: string) => {
      if (trade.id) {
        await mutateTradeDisputeChat({ tradeId: trade.id, message });
      }
    },
    [trade.id, mutateTradeDisputeChat],
  );

  const handleTradeFeedback = useCallback(
    (code: TradeFeedback) => mutateTradeFeedback({ tradeId: trade.id, code }),
    [trade.id, mutateTradeFeedback],
  );

  const chatContext = useMemo(
    () => ({
      messages: chat?.data || [],
      isLoading: tradeChatLoading,
      handleTradeSendMessage,
    }),
    [chat?.data, tradeChatLoading, handleTradeSendMessage],
  );

  const disputeChatContext = useMemo(
    () => ({
      messages: disputeChat?.data || [],
      isLoading: tradeDisputeChatLoading,
      handleTradeSendDisputeMessage,
    }),
    [disputeChat?.data, tradeDisputeChatLoading, handleTradeSendDisputeMessage],
  );

  const context = useMemo(
    () => ({
      trade,
      handleTradeAction,
      handleTradeTimeout,
      handleTradeDetails,
      handleTradeTips,
      handleTrustUser,
      handleTradeFeedback,
      modals,
      toggleModal,
      chat: chatContext,
      disputeChat: disputeChatContext,
      t,
      theme,
    }),
    [
      trade,
      handleTradeAction,
      handleTradeTimeout,
      handleTradeDetails,
      handleTradeTips,
      handleTrustUser,
      handleTradeFeedback,
      modals,
      toggleModal,
      chatContext,
      disputeChatContext,
      t,
      theme,
    ],
  );

  if (!trade.id || !trade.paymethod || !trade.partner.id) {
    return null;
  }

  return (
    <TradeContext.Provider value={context}>
      <Box className={themeClassName} fontFamily="brand" width="full">
        {isMobileDevice ? (
          <MobileTrade />
        ) : (
          <Box p="3x" display="flex" flexDirection="row" gap={gap}>
            <Box w="70%" display="flex" flexDirection="column" gap={gap} flexShrink={0}>
              <TradeState />
              <TradeDetails />
              <TradeCurrencies />
              <TradeTerms />
              <TradeHistory />
            </Box>
            <Box
              flexGrow={1}
              flexShrink={1}
              backgroundColor="tradeInfoBackground"
              p="5x"
              borderRadius="1.5x"
              display="flex"
              flexDirection="column"
              gap={gap}
            >
              <TradePartnerShort />
              <TradeInfo />
            </Box>
          </Box>
        )}
        <TradeTipsModal />
        <TradeCancelModal />
        <TradeInputDetails />
        <TradeConfirmReceiveMoneyModal />
      </Box>
    </TradeContext.Provider>
  );
};
