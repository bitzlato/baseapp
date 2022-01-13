import { useEffect, useState } from 'react';

export interface FetchResult<T> {
  data: T | undefined;
  error: FetchError | undefined;
  isLoading: boolean;
}

interface Options extends RequestInit {
  skipRequest?: boolean;
}

export function useFetch<T>(url: string, options?: Options): FetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<FetchError | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!options?.skipRequest) {
      (async () => {
        setIsLoading(true);
        try {
          setData(await fetchData(url, options));
        } catch (error) {
          setError(error as FetchError);
          setData(undefined);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [url, options?.skipRequest]);

  return { data, error, isLoading };
}

async function fetchData(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      throw new FetchError(res.status, error ? [error] : errors ?? ['Server error'], rest);
    }
    return json;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new FetchError(500, [(error as Error).toString()], {});
  }
}

export class FetchError extends Error {
  constructor(
    public code: number,
    public messages: string[],
    public payload: Record<string, string>,
  ) {
    super();
  }
}
