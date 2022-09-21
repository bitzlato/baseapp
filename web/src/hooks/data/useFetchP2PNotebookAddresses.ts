import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { NotebookAddress } from 'web/src/modules/p2p/notebook';

export const useFetchP2PNotebookAddresses = ({
  cryptocurrency,
  blockchainId,
}: {
  cryptocurrency: string;
  blockchainId?: number | undefined;
}) =>
  useFetch<NotebookAddress[]>(
    `${p2pUrl()}/profile/addresses/?${buildQueryString({ cryptocurrency, blockchainId })}`,
    fetchWithCreds,
  );
