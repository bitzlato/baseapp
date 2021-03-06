import { getCsrfToken } from 'web/src/helpers/getCsrfToken';

export class FetchError extends Error {
  constructor(public messages: string[], public code: number, public payload: Record<string, any>) {
    super(messages[0]);
    this.name = 'FetcherError';
  }
}

const createRequestWithCSRF = (init?: RequestInit): RequestInit | undefined => {
  const csrfToken = getCsrfToken();
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
      const { errors, error, ...rest } = (text ? JSON.parse(text) : {}) as any;
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

      throw new FetchError([error ?? rest.message ?? 'Server error'], res.status, rest);
    }

    return text;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    // json parse syntax error
    if (error instanceof SyntaxError) {
      throw new FetchError(['Server error'], 500, {});
    }

    throw new FetchError([(error as Error).toString()], 500, {});
  }
};

export const fetchJson = async (input: RequestInfo, init?: RequestInit) => {
  const data = await fetchData(input, init);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    // json parse syntax error
    if (error instanceof SyntaxError) {
      throw new FetchError(['Server error'], 500, {});
    }

    throw error;
  }
};

export const fetchWithCreds = (input: RequestInfo, init?: RequestInit) => {
  return fetchJson(input, { ...init, credentials: 'include' });
};
