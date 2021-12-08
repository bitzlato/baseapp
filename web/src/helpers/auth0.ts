import { auth0Config, authUrl } from 'src/api/config';
import { buildQueryString } from './buildQueryString';
import { getRandomString } from './getRandomString';
import { clearHash, parseHash } from './hash';

/**
 * https://auth0.com/docs/authorization/protocols/protocol-oauth2
 */
export async function loginWithRedirect() {
  const auth0 = auth0Config();
  if (auth0) {
    const params = {
      client_id: auth0.client_id,
      redirect_uri: auth0.redirect_uri,
      scope: 'openid profile email',
      response_type: 'id_token',
      nonce: getRandomString(16),
    };
    window.location.assign(`https://${auth0.domain}/authorize?${buildQueryString(params)}`);
  }
}

interface Auth0Response {
  id_token?: string;
}

export async function fetchBitzlatoId() {
  const { id_token } = parseHash() as Auth0Response;
  if (id_token) {
    clearHash();
    await fetch(`${authUrl()}/identity/sessions/auth0?${buildQueryString({ id_token })}`, {
      method: 'POST',
    });
  }
}
