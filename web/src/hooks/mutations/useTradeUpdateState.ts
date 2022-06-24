import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { KeyedMutator, useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import {
  TradeAvailableAction,
  TradeFeedback,
  TradeInfo,
} from 'web/src/components/shared/Trade/types';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { ChatMessageList } from 'web/src/hooks/data/useUserChat';

type UpdateTradeDetails = {
  tradeId: number;
  details: string;
};

type UpdateTradeState = {
  tradeId: number;
  action: TradeAvailableAction;
  twoFACode?: string | null | undefined;
};

type UpdateTradeStatePostAction = {
  reloadTrade?: KeyedMutator<TradeInfo>;
  toggleDetailsModal: () => void;
};

type UpdateTradeTipsPostAction = {
  reloadTrade: KeyedMutator<TradeInfo>;
  toggleTipsModal: () => void;
};

type Tips = {
  cryptocurrency: string;
  tradeId: number;
  amountPercent: number;
};

const updateTradeDetails = async ({ tradeId, details }: UpdateTradeDetails) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}`, {
    method: 'PUT',
    body: JSON.stringify({ details }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

const updateTradeState = async ({ tradeId, action, twoFACode }: UpdateTradeState) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}`, {
    method: 'POST',
    body: JSON.stringify({ type: action }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...(twoFACode && { 'X-Code-2FA': twoFACode }),
      ...(twoFACode === null && { 'X-Code-NO2FA': 'true' }),
    },
    credentials: 'include',
  });

  return response;
};

const updateTradeTimeout = async ({ tradeId }: { tradeId: number }) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/timeout`, {
    method: 'POST',
    body: JSON.stringify({ timeout: 10 }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

const tradeTips = async ({ cryptocurrency, tradeId, amountPercent }: Tips) => {
  const response = await fetchJson(`${p2pUrl()}/wallets/${cryptocurrency}/tips`, {
    method: 'POST',
    body: JSON.stringify({ tradeId, amountPercent }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

const tradeSendMessage = async ({ tradeId, message }: { tradeId: number; message: string }) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

const tradeSendDisputeMessage = async ({
  tradeId,
  message,
}: {
  tradeId: number;
  message: string;
}) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/dispute/admin-chat/`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

const tradeFeedback = async (params: { tradeId: number; code: TradeFeedback }) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${params.tradeId}/feedback`, {
    method: 'PUT',
    body: JSON.stringify({
      rate: params.code,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useTradeUpdateDetails = ({ toggleDetailsModal }: UpdateTradeStatePostAction) => {
  const dispatch = useDispatch();

  return useMutation(updateTradeDetails, {
    onSuccess: () => {
      toggleDetailsModal();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};

export const useTradeUpdateState = ({
  reloadTrade,
  toggleDetailsModal,
}: UpdateTradeStatePostAction) => {
  const dispatch = useDispatch();

  return useMutation<UpdateTradeState, any, unknown>(updateTradeState, {
    onSuccess: () => {
      reloadTrade?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.payload && error.payload.code === 'TradeDetailsRequired') {
          toggleDetailsModal();
        } else {
          dispatch(
            alertPush({
              type: 'error',
              code: error.code,
              message: error.messages,
              payload: error.payload,
            }),
          );
        }
      }
    },
  });
};

export const useTradeTimeout = ({ reloadTrade }: { reloadTrade: () => void }) => {
  const dispatch = useDispatch();

  return useMutation(updateTradeTimeout, {
    onSuccess: () => {
      reloadTrade?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};

export const useTradeTips = ({ reloadTrade, toggleTipsModal }: UpdateTradeTipsPostAction) => {
  const dispatch = useDispatch();

  return useMutation(tradeTips, {
    onSuccess: () => {
      toggleTipsModal();
      reloadTrade();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};

export const useTradeSendMessage = ({ reloadTradeChat }: { reloadTradeChat: () => void }) => {
  const { mutate, cache } = useSWRConfig();
  const dispatch = useDispatch();

  return useMutation(tradeSendMessage, {
    onMutate({ input }) {
      const tradeChatKey = `${p2pUrl()}/trade/${input.tradeId}/chat/`;
      const oldData = cache.get(tradeChatKey);

      mutate(
        tradeChatKey,
        (current: ChatMessageList) => {
          return {
            ...current,
            data: [
              ...current.data,
              {
                id: v4(),
                created: new Date().getTime(),
                file: null,
                message: input.message,
                type: 'Out',
              },
            ],
          };
        },
        false,
      );

      return () => mutate(tradeChatKey, oldData, false);
    },
    onSuccess: () => {
      reloadTradeChat();
    },
    onFailure: ({ error, rollback }) => {
      if (rollback) {
        rollback();
      }

      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};

export const useTradeSendDisputeMessage = ({
  reloadTradeDisputeChat,
}: {
  reloadTradeDisputeChat: () => void;
}) => {
  const dispatch = useDispatch();

  return useMutation(tradeSendDisputeMessage, {
    onSuccess: () => {
      reloadTradeDisputeChat();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};

export const useTradeFeedback = ({ onSuccess }: { onSuccess?: KeyedMutator<TradeInfo> }) => {
  const dispatch = useDispatch();
  return useMutation(tradeFeedback, {
    onSuccess: () => {
      onSuccess?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        dispatch(
          alertPush({
            type: 'error',
            code: error.code,
            message: error.messages,
            payload: error.payload,
          }),
        );
      }
    },
  });
};
