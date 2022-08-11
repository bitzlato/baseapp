import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { authUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getResourceUsersMeEndpoint } from 'web/src/hooks/data/barong/useFetchResourceUsersMe';

const deleteIdentitySessions = () =>
  fetchWithCreds(`${authUrl()}/identity/sessions`, {
    method: 'DELETE',
  });

export const useDeleteIdentitySessions = () => {
  const { mutate } = useSWRConfig();

  return useMutation(deleteIdentitySessions, {
    onSuccess: () => mutate(getResourceUsersMeEndpoint(), undefined),
  });
};
