import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { GenerateMergeTokenResponse } from 'web/src/modules/user/profile/types';

const LAST_MERGE_TOKEN_STRAGE_KEY = 'lastMergeToken';

const generateMergeToken = async () => {
  try {
    const response: GenerateMergeTokenResponse = await fetchWithCreds(
      `${p2pUrl()}/profile/merge/gen_code`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-code-no2fa': 'true', // TODO: use p2p 2FA
        },
      },
    );

    window.sessionStorage.setItem('lastMergeToken', response.token);

    return response;
  } catch (error: unknown) {
    if (
      error instanceof FetchError &&
      error.code === 497 &&
      error.payload.code === 'WaitForNewMergeToken'
    ) {
      const lastToken = window.sessionStorage.getItem(LAST_MERGE_TOKEN_STRAGE_KEY);
      if (lastToken) {
        return {
          token: lastToken,
        };
      }
    }

    throw error;
  }
};

export const useGenerateMergeToken = () =>
  useMutation<undefined, GenerateMergeTokenResponse>(generateMergeToken);
