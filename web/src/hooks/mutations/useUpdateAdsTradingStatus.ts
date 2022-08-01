import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { AdvertType, UserAdvert, UserAdvertSource } from 'web/src/modules/p2p/types';

interface UpdateUserAdInput {
  cryptocurrency: string;
  status?: UserAdvert['status'];
  type: AdvertType;
}

const updateAdsTradingStatus =
  (lang: string) =>
  async (params: UpdateUserAdInput): Promise<UserAdvertSource[]> => {
    return fetchWithCreds(`${p2pUrl()}/dsa/set-status-bulk/?lang=${lang}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

export const useUpdateAdsTradingStatus = (lang: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<UpdateUserAdInput, UserAdvertSource[], unknown>(updateAdsTradingStatus(lang), {
    onSuccess: () => {
      mutate(`${p2pUrl()}/dsa/all?lang=${lang}`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });
};
