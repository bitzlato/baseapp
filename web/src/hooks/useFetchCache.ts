import { createContext, useContext } from 'react';
import { FetchResult, useFetch } from './useFetch';

const Context = createContext(new Map<string, unknown>());

export const FetchCacheProvider = Context.Provider;

export function useFetchCache<T>(url: string, options?: RequestInit): FetchResult<T> {
  const cache = useContext(Context);
  const skipRequest = cache.has(url);
  const res = useFetch<T>(url, { ...options, skipRequest });
  if (skipRequest) {
    return { data: cache.get(url) as T, error: undefined, isLoading: false };
  }
  if (res.data) {
    cache.set(url, res.data);
  }
  return res;
}
