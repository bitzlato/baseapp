import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { TradeStatusSource, UserAdvertSource } from 'web/src/modules/p2p/types';

interface UpdateTradeStatusInput {
  [cryptocurrency: string]: boolean;
}

const updateTradeStatus = async (params: UpdateTradeStatusInput): Promise<UserAdvertSource[]> => {
  const response = await fetchJson(`${p2pUrl()}/dsa/status`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useUpdateTradeStatus = () => {
  const { mutate, cache } = useSWRConfig();
  const handleFetchError = useHandleFetchError();
  const tradeStatusKey = `${p2pUrl()}/dsa/status`;

  return useMutation<UpdateTradeStatusInput, UserAdvertSource[], unknown>(updateTradeStatus, {
    onMutate({ input }) {
      const oldData = cache.get(tradeStatusKey);
      mutate(
        tradeStatusKey,
        (current: TradeStatusSource) => {
          return { ...current, ...input };
        },
        false,
      );

      return () => mutate(tradeStatusKey, oldData, false);
    },
    onSuccess: () => {
      mutate(tradeStatusKey);
    },
    onFailure: ({ error, rollback }) => {
      if (rollback) {
        rollback();
      }

      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};
