import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';
import { p2pUrl } from 'web/src/api/config';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { getP2PUserChatUnreadEndpoint } from 'web/src/hooks/data/p2p/useFetchP2PUserChatUnread';

const markReadUserChat = async (publicName: string) => {
  const response = await fetchWithCreds(`${p2pUrl()}/userinfo/${publicName}/chat/unread`, {
    method: 'POST',
  });

  return response;
};

export const useP2PMarkReadUserChat = () => {
  const { mutate } = useSWRConfig();

  return useMutation(markReadUserChat, {
    onSuccess: ({ input }) => {
      mutate(getP2PUserChatUnreadEndpoint(input));
    },
  });
};
