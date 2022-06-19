import { useCallback } from 'react';
import { SWRResponse } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { fetchJson, FetchError } from 'web/src/helpers/fetch';
import { UserInfo } from 'web/src/modules/p2p/user.types';

interface BlockUserInput {
  flag: boolean;
  publicName: string;
}

const blockUser = async (params: BlockUserInput) => {
  const response = await fetchJson(`${p2pUrl()}/userinfo/${params.publicName}/block`, {
    method: 'POST',
    body: JSON.stringify({
      block: params.flag,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const useBlockUser = (swr?: SWRResponse<UserInfo, any> | undefined) => {
  const handleFetchError = useHandleFetchError();
  const [mutate] = useMutation<BlockUserInput, any, unknown>(blockUser, {
    throwOnFailure: true,
    onFailure: ({ error }) => {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    },
  });

  return useCallback(
    (input: BlockUserInput) => {
      if (swr && swr.data) {
        const optimisticData = { ...swr.data, blocked: input.flag };

        return swr.mutate(mutate(input), {
          optimisticData,
          rollbackOnError: true,
          populateCache: false,
        });
      }

      return mutate(input);
    },
    [mutate, swr],
  );
};
