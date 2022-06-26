import { useSWRConfig } from 'swr';
import { p2pUrl } from 'web/src/api';
import { useHandleFetchError } from 'web/src/components/app/AppContext';
import { FetchError, fetchWithCreds } from 'web/src/helpers/fetch';
import { useFetch } from './useFetch';

export interface NoteParams {
  text: string;
}

export interface Note {
  date: number;
  text: string;
}

export interface NoteList {
  data: Note[];
}

export const useFetchNotes = (publicName: string) => {
  const { data } = useFetch<NoteList>(`${p2pUrl()}/profile/${publicName}/notes`);
  return data?.data;
};

export const useSendNote = (publicName: string) => {
  const { mutate } = useSWRConfig();
  const handleFetchError = useHandleFetchError();

  return async (params: NoteParams): Promise<void> => {
    try {
      await fetchWithCreds(`${p2pUrl()}/profile/${publicName}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      mutate(`${p2pUrl()}/profile/${publicName}/notes`);
    } catch (error) {
      if (error instanceof FetchError) {
        handleFetchError(error);
      }
    }
  };
};
