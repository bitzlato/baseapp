export class FetchError extends Error {
  constructor(public messages: string[], public code: number, public payload: Record<string, any>) {
    super(messages[0]);
    this.name = 'FetcherError';
  }
}

export const fetchJson = async (input: RequestInfo, init: RequestInit) => {
  try {
    const res = await fetch(input, init);

    const contentlength = res.headers.get('content-length');
    const json = contentlength === '0' ? undefined : await res.json();

    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      if (Array.isArray(errors) && typeof errors[0] === 'string') {
        throw new FetchError(errors, res.status, rest);
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
