import { createContext, useContext } from 'react';
import { isEqualArrays } from '../helpers/isEqualArrays';
import { FetchResult, RequestOptions, useFetch } from './useFetch';

const Context = createContext(new Map<string, unknown>());

export const FetchCacheProvider = Context.Provider;

export function useFetchCache<T>(
  url: string,
  options?: RequestOptions,
  deps: React.DependencyList = [],
): FetchResult<T> {
  const cache = useContext(Context);
  const dataExists = cache.has(url);
  const res = useFetch<T>(
    url,
    { ...options, skipRequest: dataExists || options?.skipRequest },
    deps,
  );
  if (dataExists) {
    return { data: cache.get(url) as T, error: undefined, isLoading: false, deps: [] };
  }
  if (res.data && !res.isLoading && isEqualArrays([url, ...deps], res.deps)) {
    cache.set(url, res.data);
  }
  return res;
}
