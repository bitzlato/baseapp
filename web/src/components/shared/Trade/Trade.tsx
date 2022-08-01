import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';
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
} from 'web/src/components/shared/Trade/types';
import {
  useAppContext,
  useLanguage,
  useNotificationSubscribe,
  useTheme,
} from 'src/components/app/AppContext';
import { MobileTrade } from 'web/src/components/shared/Trade/mobile/Trade';
import { TradeCancelModal } from 'web/src/components/shared/Trade/TradeModals/TradeCancelModal';
import { TradeInputDetails } from 'web/src/components/shared/Trade/TradeInputDetails';
import { TradeDisputeReasonModal } from 'web/src/components/shared/Trade/TradeModals/TradeDisputeReasonModal';
import { TradeConfirmReceiveMoneyModal } from 'web/src/components/shared/Trade/TradeModals/TradeConfirmReceiveMoneyModal';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import { useAdapterContext, useSharedT } from 'web/src/components/shared/Adapter';
import { useFetchTradeInfo } from 'web/src/hooks/data/useFetchTrade';
import { useFetchTraderInfo } from 'web/src/hooks/data/useFetchTraderInfo';
import { useFetchPaymethod } from 'web/src/hooks/data/useFetchPaymethod';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { PaymethodSource } from 'web/src/modules/p2p/types';
import {
  useDisputeDescribe,
  useTradeFeedback,
  useTradeTimeout,
  useTradeTips,
  useTradeUpdateDetails,
  useTradeUpdateState,
} from 'web/src/hooks/mutations/useTradeUpdateState';
import { useTrustUser } from 'web/src/hooks/mutations/useTrustUser';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import {
  getFormatOptionsByLanguage,
  getP2PFiatOptionsByCode,
} from 'web/src/components/AmountFormat/getFormatOptionsByLanguage';
import { useP2PFiatCurrencies } from 'web/src/hooks/useP2PFiatCurrencies';
import { createMoney } from 'web/src/helpers/money';
import { useP2PCryptoCurrencies } from 'web/src/hooks/useP2PCryptoCurrencies';
import { NotificationNewMessage } from 'web/src/lib/socket/types';
import { getP2PTradeDisputeEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDispute';
import { getP2PTradeDisputeUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeDisputeUnread';
import { getP2PTradeChatEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChat';
import { getP2PTradeChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PTradeChatUnread';
import { TradeTwoFactorModal } from 'web/src/components/shared/Trade/TradeModals/TradeTwoFactorModal';

const tradeEventList = [
  'tradeStatusChanged',
  'tradeExtendWaitingTime',
  'disputeResolved',
  'disputeAvailable',
];

export const SharedTrade: FC = () => {
  const t = useSharedT();
  const { isMobileDevice } = useAppContext();
  const { mutate } = useSWRConfig();
  const { params } = useAdapterContext<{ tradeId: string | undefined }>();
  const { getFiatCurrency } = useP2PFiatCurrencies();
  const { getCryptoCurrency } = useP2PCryptoCurrencies();

  const { tradeId } = params;

  const theme = useTheme();
  const [askTradeDetails, setAskTradeDetails] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [tips, setTips] = useState(false);
  const [askDisputeReason, setAskDisputeReason] = useState(false);
  const [ask2fa, setAsk2fa] = useState(false);

  const gap = '3x';
  const themeClassName = theme === 'light' ? themeLight : themeDark;

  const modals: { [key in TradeModals]: boolean } = useMemo(
    () => ({
      details: askTradeDetails,
      confirmCancel,
      confirmPayment,
      tips,
      disputeReason: askDisputeReason,
      ask2fa,
    }),
    [askTradeDetails, confirmCancel, confirmPayment, tips, askDisputeReason, ask2fa],
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

    if (modal === 'disputeReason') {
      toggler = setAskDisputeReason;
    }

    if (modal === 'ask2fa') {
      toggler = setAsk2fa;
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

  const [mutateTradeState] = useTradeUpdateState({
    reloadTrade,
    toggleDetailsModal: () => toggleModal('details'),
    toggle2faModal: () => toggleModal('ask2fa'),
  });

  const [mutateDescribeDispute] = useDisputeDescribe();

  const [mutateTradeTimeout] = useTradeTimeout({ reloadTrade });

  const [mutateTradeDetails] = useTradeUpdateDetails({
    toggleDetailsModal: () => toggleModal('details'),
  });

  const [mutateTradeTips] = useTradeTips({
    reloadTrade,
    toggleTipsModal: () => toggleModal('tips'),
  });

  const [mutateTradeFeedback] = useTradeFeedback({ onSuccess: reloadTrade });

  const trustUser = useTrustUser(partnerSWR);

  const handleTrustUser = useCallback(
    (flag: boolean, publicName: string) => trustUser({ flag, publicName }),
    [trustUser],
  );

  const handleTradeAction = useCallback(
    (action: TradeAvailableAction, twoFACode?: string) => {
      if (trade.id) {
        mutateTradeState({ tradeId: trade.id, action, twoFACode: twoFACode ?? null });
      }
    },
    [trade.id, mutateTradeState],
  );

  const handleOpenDispute = useCallback(
    (reason: string | undefined) => {
      if (trade.id) {
        mutateTradeState({ tradeId: trade.id, action: 'dispute', twoFACode: null })
          .then(() => {
            if (reason) {
              mutateDescribeDispute({ tradeId: trade.id, reason });
            }
          })
          .then(() => {
            toggleModal('disputeReason');
          });
      }
    },
    [trade.id, mutateTradeState, mutateDescribeDispute, toggleModal],
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

  const handleTradeFeedback = useCallback(
    (code: TradeFeedback) => mutateTradeFeedback({ tradeId: trade.id, code }),
    [trade.id, mutateTradeFeedback],
  );

  const tradeValues = useMemo(() => {
    if (trade.id) {
      return {
        currency: createMoney(trade.currency.amount, getFiatCurrency(trade.currency.code)).toFormat(
          {
            ...getFormatOptionsByLanguage(lang),
            ...getP2PFiatOptionsByCode(trade.currency.code),
          },
        ),

        cryptocurrency: createMoney(
          trade.cryptocurrency.amount,
          getCryptoCurrency(trade.cryptocurrency.code),
        ).toFormat({ ...getFormatOptionsByLanguage(lang), maxFractionDigits: 8 }),
      };
    }

    return { currency: '0', cryptocurrency: '0' };
  }, [trade.id, trade.currency, trade.cryptocurrency, lang, getFiatCurrency, getCryptoCurrency]);

  const context = useMemo(
    () => ({
      trade,
      handleTradeAction,
      handleTradeTimeout,
      handleTradeDetails,
      handleTradeTips,
      handleTrustUser,
      handleTradeFeedback,
      handleOpenDispute,
      modals,
      toggleModal,
      t,
      theme,
      formattedTradeValues: tradeValues,
    }),
    [
      trade,
      handleTradeAction,
      handleTradeTimeout,
      handleTradeDetails,
      handleTradeTips,
      handleTrustUser,
      handleTradeFeedback,
      handleOpenDispute,
      modals,
      toggleModal,
      t,
      theme,
      tradeValues,
    ],
  );

  useNotificationSubscribe(
    useCallback(
      (notify) => {
        if (tradeEventList.includes(notify.name)) {
          reloadTrade();
        }
      },
      [reloadTrade],
    ),
  );

  useNotificationSubscribe(
    useCallback(
      (notify) => {
        if (notify.name === 'newChatMessage' && 'tradeId' in notify && notify.tradeId && trade.id) {
          const { isAdmin } = notify as NotificationNewMessage;
          if (isAdmin) {
            mutate(getP2PTradeDisputeEndpoint(trade.id));
            mutate(getP2PTradeDisputeUnreadEndpoint(trade.id));
          } else {
            mutate(getP2PTradeChatEndpoint(trade.id));
            mutate(getP2PTradeChatUnreadEndpoint(trade.id));
          }
        }
      },
      [mutate, trade.id],
    ),
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
          <>
            <Box px="8x">
              <Breadcrumbs>
                <BreadcrumbsItem to={`/${lang}/p2p`}>{t('Market')}</BreadcrumbsItem>
                <BreadcrumbsItem to={`/${lang}/p2p/trades`}>{t('My trades')}</BreadcrumbsItem>
                <BreadcrumbsItem>{trade.id}</BreadcrumbsItem>
              </Breadcrumbs>
            </Box>
            <Box pt="0" p="3x" display="flex" flexDirection="row" gap={gap}>
              <Box w="70%" display="flex" flexDirection="column" gap={gap} flexShrink={0}>
                <TradeState />
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
          </>
        )}
        <TradeTipsModal />
        <TradeCancelModal />
        <TradeInputDetails />
        <TradeConfirmReceiveMoneyModal />
        <TradeDisputeReasonModal />
        <TradeTwoFactorModal />
      </Box>
    </TradeContext.Provider>
  );
};
