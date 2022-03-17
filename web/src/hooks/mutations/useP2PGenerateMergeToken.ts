import useMutation, { Options } from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { GenerateMergeTokenResponse } from 'web/src/modules/user/profile/types';

const LAST_MERGE_TOKEN_STORAGE_KEY = 'lastMergeToken';

const passMergeWizard = () =>
  fetchWithCreds(`${p2pUrl()}/profile/merge/pass_wizard`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

interface Input {
  otp?: string | undefined;
}

const generateMergeToken = async ({ otp }: Input) => {
  try {
    await passMergeWizard();

    const response: GenerateMergeTokenResponse = await fetchWithCreds(
      `${p2pUrl()}/profile/merge/gen_code`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          ...(otp && { 'X-Code-2FA': otp }),
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
      const lastToken = window.sessionStorage.getItem(LAST_MERGE_TOKEN_STORAGE_KEY);
      if (lastToken) {
        return {
          token: lastToken,
        };
      }
    }

    throw error;
  }
};

export const useP2PGenerateMergeToken = (
  options?: Options<Input, GenerateMergeTokenResponse, any> | undefined,
) => useMutation(generateMergeToken, options);
