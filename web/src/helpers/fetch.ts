export class FetchError extends Error {
  constructor(public messages: string[], public code: number, public payload: Record<string, any>) {
    super(messages[0]);
    this.name = 'FetcherError';
  }
}

export const fetchJson = async (input: RequestInfo, init: RequestInit) => {
  try {
    const res = await fetch(input, init);

    const contentLength = res.headers.get('content-length');
    const json = contentLength === '0' ? undefined : await res.json();

    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      if (Array.isArray(errors)) {
        const item = errors[0];
        if (typeof item === 'string') {
          throw new FetchError(errors, res.status, rest);
        } else if (typeof item?.details === 'string') {
          throw new FetchError(
            errors.map((d) => d.details),
            res.status,
            rest,
          );
        }
      }

      throw new FetchError([error ?? rest.message ?? 'Server error'], res.status, rest);
    }

    return json;
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

export const fetchWithCreds = (input: RequestInfo, init: RequestInit) => {
  return fetchJson(input, { ...init, credentials: 'include' });
};

export const fetchRaw = async (input: RequestInfo, init: RequestInit) => {
  try {
    return await fetch(input, init);
  } catch (error) {
    throw new FetchError([(error as Error).toString()], 500, {});
  }
};
