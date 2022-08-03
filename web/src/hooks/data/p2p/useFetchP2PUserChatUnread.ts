import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';

export const getP2PUserChatUnreadEndpoint = (publicName: string) =>
  `${p2pUrl()}/userinfo/${publicName}/chat/unread`;

export const useFetchP2PUserChatUnread = (publicName: string) =>
  useFetch<number>(getP2PUserChatUnreadEndpoint(publicName), fetchWithCreds, {
    revalidateOnFocus: false,
  });
