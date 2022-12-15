import Bugsnag from '@bugsnag/js';
import { getCSRFToken } from 'web/src/helpers/CSRFToken';

const parseJSON = (str: string | undefined, emptyResult = {}): any => {
  if (!str) {
    return emptyResult;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    return emptyResult;
  }
};

export class FetchError extends Error {
  constructor(public messages: string[], public code: number, public payload: Record<string, any>) {
    super(messages[0]);
    this.name = 'FetcherError';
  }
}

const createRequestWithCSRF = (init?: RequestInit): RequestInit | undefined => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    return {
      ...init,
      headers: {
        ...init?.headers,
        'X-CSRF-Token': csrfToken,
      },
    };
  }

  return init;
};

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const options = init?.method ? createRequestWithCSRF(init) : init;

    const res = await fetch(input, options);

    const contentLength = res.headers.get('content-length');
    const text = contentLength === '0' ? undefined : await res.text();

    if (!res.ok) {
      try {
        const { errors, error, ...rest } = parseJSON(text);

        if (res.status >= 500) {
          Bugsnag.notify(res.statusText, (event) => {
            // eslint-disable-next-line no-param-reassign
            event.context = 'fetchData:error5xx';
            event.addMetadata('extra', {
              url: res.url,
              method: options?.method ?? 'GET',
              response: text,
              traceid: res.headers.get('x-b3-traceid'),
            });
          });
        }

        if (Array.isArray(errors)) {
          const item = errors[0];
          if (typeof item === 'string') {
            throw new FetchError(errors, res.status, rest);
          } else if (typeof item?.detail === 'string') {
            throw new FetchError(
              errors.map((d) => d.detail),
              res.status,
              rest,
            );
          }
        }

        throw new FetchError([error ?? rest.message ?? res.statusText], res.status, rest);
      } catch (error) {
        if (error instanceof FetchError) {
          throw error;
        }

        // json parse syntax error
        if (error instanceof SyntaxError) {
          const { message } = error;
          const notifyMessage = 'Failure to parse rejection response';

          Bugsnag.notify(notifyMessage, (event) => {
            // eslint-disable-next-line no-param-reassign
            event.context = 'fetchData:rejection_response_parsing';
            event.addMetadata('extra', {
              url: res.url,
              method: options?.method ?? 'GET',
              response: text,
              error: message,
              traceid: res.headers.get('x-b3-traceid'),
            });
          });

          throw new FetchError([notifyMessage], 500, {});
        }
      }
    }

    return text;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    const message = (error as Error).toString();

    Bugsnag.notify(message, (event) => {
      // eslint-disable-next-line no-param-reassign
      event.context = 'fetchData:unknow_error';
      event.addMetadata('extra', {
        url: input,
        method: init?.method ?? 'GET',
      });
    });

    throw new FetchError([message], 500, {});
  }
};

export const fetchJson = async (input: RequestInfo, init?: RequestInit) => {
  const data = await fetchData(input, init);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    // json parse syntax error
    if (error instanceof SyntaxError) {
      const { message } = error;
      const notifyMessage = 'Failure to parse response';

      Bugsnag.notify(notifyMessage, (event) => {
        // eslint-disable-next-line no-param-reassign
        event.context = 'fetchData:response_parsing';
        event.addMetadata('extra', {
          url: input,
          method: init?.method ?? 'GET',
          response: data,
          error: message,
        });
      });

      throw new FetchError([notifyMessage], 500, {});
    }

    throw error;
  }
};

export const fetchWithCreds = (input: RequestInfo, init?: RequestInit) => {
  return fetchJson(input, { ...init, credentials: 'include' });
};

interface MutationInit extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export const fetchMutation = (input: RequestInfo, init?: MutationInit) =>
  fetchJson(input, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
    ...init,
    body: init?.body ? JSON.stringify(init?.body) : null,
  });
