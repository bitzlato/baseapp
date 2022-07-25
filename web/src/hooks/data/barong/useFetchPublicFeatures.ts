import { authUrl } from 'web/src/api';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { Feature } from 'web/src/types/featuresToggling.types';

export const useFetchPublicFeatures = () =>
  useFetch<ReadonlyArray<Feature>>(`${authUrl()}/public/features`, fetchJson, {
    revalidateOnFocus: false,
  });
