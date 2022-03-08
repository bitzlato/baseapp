export class FetcherError extends Error {
  constructor(public messages: string[], public code: number, public payload: Record<string, any>) {
    super(messages[0]);
    this.name = 'FetcherError';
  }
}

export const fetcher = async (input: RequestInfo, init: RequestInit) => {
  try {
    const res = await fetch(input, init);
    const json = await res.json();
    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      if (Array.isArray(errors) && typeof errors[0] === 'string') {
        throw new FetcherError(errors, res.status, rest);
      }

      throw new FetcherError(error ? [error] : ['Server error'], res.status, rest);
    }

    return json;
  } catch (error) {
    if (error instanceof FetcherError) {
      throw error;
    }

    throw new FetcherError([(error as Error).toString()], 500, {});
  }
};
