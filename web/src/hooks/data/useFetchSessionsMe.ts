import { authUrl } from 'web/src/api/config';
import { SessionsMe } from 'web/src/modules/types';
import { useFetch } from './useFetch';

export const useFetchSessionsMe = () => {
  return useFetch<SessionsMe>(`${authUrl()}/identity/sessions/me`);
};
