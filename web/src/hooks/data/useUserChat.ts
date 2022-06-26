import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { buildQueryString } from 'web/src/helpers';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export interface ChatParams {
  publicName: string;
  limit?: number;
  before?: number;
}

export interface ChatInputParams {
  message?: string;
}

export interface ChatMessageType {
  id: number;
  type: 'In' | 'Out';
  created: number;
  message: string;
  file: string;
}

export interface ChatMessageList {
  data: ChatMessageType[];
  total: number;
}

const useChatMutate = (url: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return async (params?: ChatInputParams): Promise<void> => {
    try {
      await fetchWithCreds(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...(params !== undefined ? { body: JSON.stringify(params) } : null),
      });
      mutate(url);
    } catch (error) {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    }
  };
};

export const useFetchMessages = (params: ChatParams) => {
  const { data } = useFetch<ChatMessageList>(
    `${p2pUrl()}/userinfo/${params.publicName}/chat/`,
    async (): Promise<ChatMessageList> =>
      fetchWithCreds(
        `${p2pUrl()}/userinfo/${params.publicName}/chat/?${buildQueryString({
          limit: params.limit || 100,
          before: params.before,
        })}`,
      ),
  );

  return data?.data;
};

export const useFetchUnreadMessages = (params: ChatParams) => {
  const { data } = useFetch(`${p2pUrl()}/userinfo/${params.publicName}/chat/unread`);

  return data;
};

export const useMarkReadMessages = (publicName: string) =>
  useChatMutate(`${p2pUrl()}/userinfo/${publicName}/chat/unread`);

export const useSendMessage = (params: ChatParams) =>
  useChatMutate(`${p2pUrl()}/userinfo/${params.publicName}/chat/`);
