import { KeyedMutator } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import {
  TradeAvailableAction,
  TradeFeedback,
  TradeInfo,
} from 'web/src/components/shared/Trade/types';
import { fetchJson, FetchError, fetchData } from 'web/src/helpers/fetch';
import { Trade } from 'web/src/modules/p2p/trade.types';

type UpdateTradeDetails = {
  tradeId: number;
  details: string;
};

type UpdateTradeState = {
  tradeId: number;
  action: TradeAvailableAction;
  twoFACode?: string | null | undefined;
};

type DescribeDispute = {
  tradeId: number;
  reason: string;
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

type TradeStart = {
  advertId: number;
  amount: string;
  amountType: string;
  rate: string;
  details: string | null;
};

type TradeStartResp = Trade;

const updateTradeDetails = async ({ tradeId, details }: UpdateTradeDetails) => {
  const response = await fetchData(`${p2pUrl()}/trade/${tradeId}`, {
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

const describeDispute = async ({ tradeId, reason }: DescribeDispute) => {
  const response = await fetchJson(`${p2pUrl()}/trade/${tradeId}/dispute/description`, {
    method: 'POST',
    body: JSON.stringify({ description: reason }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
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

const tradeStart = async (params: TradeStart) => {
  const response = await fetchJson(`${p2pUrl()}/trade/`, {
    method: 'POST',
    body: JSON.stringify({
      advertId: params.advertId,
      amount: params.amount,
      amountType: params.amountType,
      rate: params.rate,
      counterDetails: params.details,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useTradeUpdateDetails = ({ toggleDetailsModal }: UpdateTradeStatePostAction) => {
  const handleFetchError = useHandleFetchError();

  return useMutation(updateTradeDetails, {
    onSuccess: () => {
      toggleDetailsModal();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};

export const useTradeUpdateState = ({
  reloadTrade,
  toggleDetailsModal,
}: UpdateTradeStatePostAction) => {
  const handleFetchError = useHandleFetchError();

  return useMutation<UpdateTradeState, any, unknown>(updateTradeState, {
    onSuccess: () => {
      reloadTrade?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.payload && error.payload.code === 'TradeDetailsRequired') {
          toggleDetailsModal();
        } else {
          handleFetchError(error);
        }
      }
    },
  });
};

export const useDisputeDescribe = () => {
  const handleFetchError = useHandleFetchError();

  return useMutation<DescribeDispute, any, unknown>(describeDispute, {
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};

export const useTradeTimeout = ({ reloadTrade }: { reloadTrade: () => void }) => {
  const handleFetchError = useHandleFetchError();

  return useMutation(updateTradeTimeout, {
    onSuccess: () => {
      reloadTrade?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};

export const useTradeTips = ({ reloadTrade, toggleTipsModal }: UpdateTradeTipsPostAction) => {
  const handleFetchError = useHandleFetchError();

  return useMutation(tradeTips, {
    onSuccess: () => {
      toggleTipsModal();
      reloadTrade();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};

export const useTradeFeedback = ({ onSuccess }: { onSuccess?: KeyedMutator<TradeInfo> }) => {
  const handleFetchError = useHandleFetchError();
  return useMutation(tradeFeedback, {
    onSuccess: () => {
      onSuccess?.();
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};

export const useTradeStart = ({ onFailure }: { onFailure: (reason: string) => void }) => {
  const handleFetchError = useHandleFetchError();
  const [mutate] = useMutation<TradeStart, TradeStartResp, unknown>(tradeStart, {
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (
          error.payload &&
          (error.payload.code === 'AmountIsTooBig' ||
            error.payload.code === 'AmountIsTooLow' ||
            error.payload.code === 'ForbiddenTradeWithYourself' ||
            error.payload.code === 'TradeRateWasChanged')
        ) {
          onFailure(error.payload.code);
          return;
        }

        handleFetchError(error);
      }
    },
  });

  return mutate;
};
