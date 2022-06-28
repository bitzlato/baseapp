import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { AdsType } from 'web/src/components/shared/Trade/types';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';

type TradeEstimate = {
  advertId: number;
  amount: string;
  amountType: string;
  rate: string;
};

type EstimateResp = {
  cryptocurrency: { code: string; amount: string };
  currency: { code: string; amount: string; paymethod: string };
  fee: null;
  type: AdsType;
};

const tradeEstimate = async (params: TradeEstimate) => {
  const response = await fetchJson(`${p2pUrl()}/trade/idle`, {
    method: 'POST',
    body: JSON.stringify({
      advertId: params.advertId,
      amount: params.amount,
      amountType: params.amountType,
      rate: params.rate,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useTradeEstimate = ({ onFailure }: { onFailure: (reason: string) => void }) => {
  const handleFetchError = useHandleFetchError();
  const [mutate] = useMutation<TradeEstimate, EstimateResp, unknown>(tradeEstimate, {
    throwOnFailure: false,
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.payload && error.payload.code === 'TradeRateWasChanged') {
          onFailure(error.payload.code);
          return;
        }
        handleFetchError(error);
      }
    },
  });

  return mutate;
};
