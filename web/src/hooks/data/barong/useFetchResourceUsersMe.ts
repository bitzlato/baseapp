import { authUrl } from 'web/src/api';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { User } from 'web/src/modules/user/profile/types';

export const getResourceUsersMeEndpoint = () => `${authUrl()}/resource/users/me`;

export const useFetchResourceUsersMe = () => useFetch<User>(getResourceUsersMeEndpoint());
