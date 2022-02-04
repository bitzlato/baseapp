import { useEffect, useReducer } from 'react';
import { isEqualArrays } from 'src/helpers/isEqualArrays';

export interface FetchResult<T> {
  data: T | undefined;
  error: FetchError | undefined;
  isLoading: boolean;
  deps: React.DependencyList;
}

export interface RequestOptions extends RequestInit {
  skipRequest?: boolean | undefined;
}

const INITIAL: FetchResult<any> = {
  isLoading: false,
  data: undefined,
  error: undefined,
  deps: [],
};

export function useFetch<T>(
  url: string,
  options?: RequestOptions,
  deps: React.DependencyList = [],
): FetchResult<T> {
  deps = [url, ...deps];

  const [state, dispatch] = useReducer(
    (p: FetchResult<T>, c: Partial<FetchResult<T>>) => ({ ...p, ...c }),
    deps,
    (deps) => ({
      ...INITIAL,
      deps,
    }),
  );

  useEffect(() => {
    if (!isEqualArrays(deps, state.deps)) {
      dispatch({ ...INITIAL, deps });
    }
    if (!options?.skipRequest) {
      let controller: AbortController | undefined = new AbortController();
      (async () => {
        dispatch({ isLoading: true });
        try {
          const data = await fetchData(url, { ...options, signal: controller.signal });
          if (!controller.signal.aborted) {
            dispatch({ isLoading: false, data });
          }
        } catch (error) {
          if (!controller.signal.aborted) {
            dispatch({ isLoading: false, data: undefined, error: error as FetchError });
          }
        }
      })();
      return () => controller?.abort();
    }
  }, deps);

  return isEqualArrays(deps, state.deps) ? state : INITIAL;
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
