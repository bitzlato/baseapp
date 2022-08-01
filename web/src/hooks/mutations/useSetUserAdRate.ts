import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { Language } from 'web/src/types';

interface SetUserAdRateInput {
  currency: string;
  cryptocurrency: string;
  type: string;
  rateValue: string | null | undefined;
  ratePercent: string | null | undefined;
}

const setUserAdRate = async (input: SetUserAdRateInput): Promise<void> => {
  const response = await fetchJson(`${p2pUrl()}/dsa/changerates`, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useSetUserAdRate = (lang: Language) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<SetUserAdRateInput>(setUserAdRate, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${p2pUrl()}/dsa/all?lang=${lang}`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.code === 481 && error.payload.code === 'AdsUpdatedToOften') {
          return;
        }

        handleFetchError(error);
      }
    },
  });
};
