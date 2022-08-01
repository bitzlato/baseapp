import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { UserAdvert, UserAdvertSource } from 'web/src/modules/p2p/types';

export interface DeleteUserAdInput {
  id: UserAdvert['id'];
}

const deleteUserAd = async ({ id }: DeleteUserAdInput): Promise<UserAdvertSource> => {
  const response = await fetchWithCreds(`${p2pUrl()}/dsa/${id}`, {
    method: 'DELETE',
  });

  return response;
};

export const useDeleteUserAd = (lang: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<DeleteUserAdInput, UserAdvertSource, unknown>(deleteUserAd, {
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
