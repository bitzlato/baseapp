import { useEffect, useState } from 'react';

export interface FetchResult<T> {
  data: T | undefined;
  error: FetchError | undefined;
  isLoading: boolean;
}

interface Options extends RequestInit {
  skipRequest?: boolean;
}

export function useFetch<T>(
  url: string,
  options?: Options,
  deps: React.DependencyList = [],
): FetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<FetchError | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!options?.skipRequest) {
      let controller: AbortController | undefined = new AbortController();
      (async () => {
        setIsLoading(true);
        try {
          const data = await fetchData(url, { ...options, signal: controller.signal });
          if (!controller.signal.aborted) {
            setData(data);
            setIsLoading(false);
          }
        } catch (error) {
          if (!controller.signal.aborted) {
            setError(error as FetchError);
            setData(undefined);
            setIsLoading(false);
          }
        }
      })();
      return () => controller?.abort();
    }
  }, [url, options?.skipRequest, ...deps]);

  return { data, error, isLoading };
}

async function fetchData(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) {
      const { errors, error, ...rest } = json ?? {};
      if (errors && errors.length && typeof errors[0] === 'string') {
        throw new FetchError(res.status, errors, rest);
      }
      throw new FetchError(res.status, error ? [error] : ['Server error'], rest);
    }
    return json;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new FetchError(500, [(error as Error).toString()], {});
  }
}

export function postData(url: string, data: Object, options?: RequestInit) {
  return fetchData(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
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
