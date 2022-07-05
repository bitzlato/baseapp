import { p2pUrl } from 'web/src/api/config';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { getCookie } from 'web/src/helpers/getCookie';

const DEEPLINK_CODE_COOKIE_NAME = 'deeplink_code';

const setReferral = async (code: string) => {
  const response = await fetchJson(`${p2pUrl()}/profile/referrals/`, {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
  });

  return response;
};

export const applyReferral = async () => {
  const code = getCookie(DEEPLINK_CODE_COOKIE_NAME);
  if (code) {
    try {
      await setReferral(code);
    } catch (error: unknown) {
      // ignore FetchError
      if (!(error instanceof FetchError)) {
        throw error;
      }
    }
  }
};
