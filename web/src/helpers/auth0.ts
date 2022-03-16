import { API } from 'src/api';
import { auth0Config } from 'src/api/config';
import { buildQueryString } from './buildQueryString';
import { getRandomString } from './getRandomString';
import { clearHash, parseHash } from './hash';

/**
 * https://auth0.com/docs/authorization/protocols/protocol-oauth2
 */
export async function loginAuth0() {
  const auth0 = auth0Config();
  if (auth0) {
    const params = {
      client_id: auth0.client_id,
      redirect_uri: auth0.redirect_uri,
      scope: 'openid profile email',
      response_type: 'id_token',
      // response_type: 'id_token token',
      response_mode: 'fragment',
      nonce: getRandomString(16),
    };
    window.location.assign(`https://${auth0.domain}/authorize?${buildQueryString(params)}`);
  } else {
    window.location.href = '/signin';
  }
}

interface BarongAuth0Response {
  id_token?: string;
}

export async function fetchBitzlatoId() {
  const { id_token } = parseHash() as BarongAuth0Response;
  if (id_token) {
    try {
      await API.post({ apiVersion: 'barong' })(
        `/identity/sessions/auth0?${buildQueryString({ id_token })}`,
      );
      clearHash();
    } catch (error) {
      throw error;
    }
  }
}
