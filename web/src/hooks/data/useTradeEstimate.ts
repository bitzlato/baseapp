import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api';
import { AdsType } from 'web/src/components/shared/Trade/types';
import { fetchJson } from 'web/src/helpers/fetch';

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

export const useTradeEstimate = () => {
  const [mutate] = useMutation<TradeEstimate, EstimateResp, unknown>(tradeEstimate, {
    throwOnFailure: false,
  });

  return mutate;
};
