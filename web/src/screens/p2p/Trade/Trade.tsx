import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Adapter, useSharedT } from 'web/src/components/shared/Adapter';
import { SharedTrade } from 'web/src/components/shared/Trade/Trade';
import {
  Trade,
  TradeAvailableAction,
  TradeFeedback,
  TradeModals,
  TradeStatus,
} from 'web/src/components/shared/Trade/types';
import { Link, useHistory } from 'react-router-dom';

import {
  useFetchTradeChat,
  useFetchTradeDisputeChat,
  useFetchTradeInfo,
} from 'web/src/hooks/data/useFetchTrade';
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
import { useSelector } from 'react-redux';
import { selectCurrentColorTheme } from 'web/src/modules';
import { useLanguage } from 'web/src/components/app/AppContext';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { PaymethodSource } from 'web/src/modules/p2p/types';

const TradeComponent: FC = () => {
  const t = useSharedT();
  const theme = useSelector(selectCurrentColorTheme);
  const params = useParams<{ tradeId?: string }>();

  const [askTradeDetails, setAskTradeDetails] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [tips, setTips] = useState(false);

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

  const { data: tradeInfo, mutate: reloadTrade } = useFetchTradeInfo(params.tradeId);

  const partnerSWR = useFetchTraderInfo(tradeInfo?.partner);

  const { data: paymethod } = useFetchPaymethod(tradeInfo?.currency.paymethod, lang);

  const trade = useMemo<Trade>(
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
  } = useFetchTradeChat(params.tradeId);

  const {
    data: disputeChat,
    isValidating: tradeDisputeChatLoading,
    mutate: reloadTradeDisputeChat,
  } = useFetchTradeDisputeChat(
    trade && trade.id && trade.status === TradeStatus.DISPUTE ? params.tradeId : undefined,
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
    (flag, publicName) => {
      trustUser({ flag, publicName });
    },
    [trustUser],
  );

  const handleTradeAction = (action: TradeAvailableAction) => {
    if (trade.id) {
      mutateTradeState({ tradeId: trade.id, action, twoFACode: null });
    }
  };

  const handleTradeDetails = (details: string, onSuccess?: () => void) => {
    if (trade.id) {
      mutateTradeDetails({ tradeId: trade.id, details }).then(() => onSuccess?.());
    }
  };

  const handleTradeTimeout = useCallback(() => {
    if (trade.id) {
      mutateTradeTimeout({ tradeId: trade.id });
    }
  }, [mutateTradeTimeout, trade.id]);

  const handleTradeTips = useCallback(
    (tipsAmount: number) => {
      if (trade.id) {
        mutateTradeTips({
          tradeId: trade.id,
          cryptocurrency: trade.cryptocurrency.code,
          amountPercent: tipsAmount,
        });
      }
    },
    [mutateTradeTips, trade.cryptocurrency?.code, trade.id],
  );

  const handleTradeSendMessage = useCallback(
    async (message: string) => {
      if (trade.id) {
        await mutateTradeChat({ tradeId: trade.id, message });
      }
    },
    [mutateTradeChat, trade?.id],
  );

  const handleTradeSendDisputeMessage = useCallback(
    async (message: string) => {
      if (trade.id) {
        mutateTradeDisputeChat({ tradeId: trade.id, message });
      }
    },
    [mutateTradeDisputeChat, trade?.id],
  );

  const handleTradeFeedback = useCallback(
    (code: TradeFeedback) => mutateTradeFeedback({ tradeId: trade.id, code }),
    [mutateTradeFeedback, trade.id],
  );

  const chatContext = useMemo(
    () => ({ messages: chat?.data || [], isLoading: tradeChatLoading, handleTradeSendMessage }),
    [chat, tradeChatLoading, handleTradeSendMessage],
  );

  const disputeChatContext = useMemo(
    () => ({
      messages: disputeChat?.data || [],
      isLoading: tradeDisputeChatLoading,
      handleTradeSendDisputeMessage,
    }),
    [disputeChat, tradeDisputeChatLoading, handleTradeSendDisputeMessage],
  );

  if (!trade.id || !trade.paymethod || !trade.partner.id) {
    return null;
  }

  return (
    <SharedTrade
      chat={chatContext}
      disputeChat={disputeChatContext}
      trade={trade}
      handleTradeTimeout={handleTradeTimeout}
      handleTradeAction={handleTradeAction}
      handleTradeDetails={handleTradeDetails}
      handleTradeTips={handleTradeTips}
      handleTrustUser={handleTrustUser}
      handleTradeFeedback={handleTradeFeedback}
      modals={modals}
      toggleModal={toggleModal}
      t={t}
      theme={theme}
    />
  );
};

export const TradeScreen: FC = () => {
  const history = useHistory();

  return (
    <Adapter Link={Link} history={history}>
      <TradeComponent />
    </Adapter>
  );
};
