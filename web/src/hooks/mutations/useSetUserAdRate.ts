import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchMutation } from 'web/src/helpers/fetch';
import { Language } from 'web/src/types';

interface SetUserAdRateInput {
  currency: string;
  cryptocurrency: string;
  type: string;
  rateValue: string | null | undefined;
  ratePercent: string | null | undefined;
}

export interface SetUserAdRateData {
  updatedAds: ReadonlyArray<number>;
  notUpdatedAds: ReadonlyArray<number>;
}

const setUserAdRate = async (input: SetUserAdRateInput): Promise<SetUserAdRateData> =>
  fetchMutation(`${p2pUrl()}/dsa/changerates`, {
    method: 'PUT',
    body: input,
  });

export const useSetUserAdRate = (lang: Language) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<SetUserAdRateInput, SetUserAdRateData>(setUserAdRate, {
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
