import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { UserAdvert, UserAdvertSource } from 'web/src/modules/p2p/types';

export interface UpdateUserAdInput {
  id: UserAdvert['id'];
  params: {
    status?: UserAdvert['status'];
  };
}

const updateUserAd = async ({ id, params }: UpdateUserAdInput): Promise<UserAdvertSource> => {
  const response = await fetchJson(`${p2pUrl()}/dsa/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useUpdateUserAd = (lang: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return useMutation<UpdateUserAdInput, UserAdvertSource, unknown>(updateUserAd, {
    throwOnFailure: true,
    onSuccess: () => {
      mutate(`${p2pUrl()}/dsa/all?lang=${lang}`);
    },
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        if (error.code === 477 && error.payload.code === 'AdvertIsDisabled') {
          return;
        }

        handleFetchError(error);
      }
    },
  });
};
