import { authUrl } from 'web/src/api/config';
import { fetcher } from 'web/src/helpers/fetcher';
import { SessionsMe } from 'web/src/modules/types';
import { useFetcher } from './useFetcher';

export const useFetchSessionsMe = () => {
  return useFetcher<SessionsMe>(`${authUrl()}/identity/sessions/me`, fetcher);
};
