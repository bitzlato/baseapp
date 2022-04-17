import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { P2PReport } from 'web/src/modules/user/profile/types';
import { useFetch } from './useFetch';

export const useFetchP2PReports = () =>
  useFetch<ReadonlyArray<P2PReport>>(`${p2pUrl()}/reports/`, fetchWithCreds);

export const useFetchP2PReport = (code: number) =>
  useFetch<ArrayBuffer>(
    `${p2pUrl()}/reports/${code}?responseTypes=arraybuffer`,
    async (endpoint: string) => {
      const response = await fetch(endpoint, {
        credentials: 'include',
      });

      return response.arrayBuffer();
    },
    {
      revalidateOnFocus: false,
    },
  );
