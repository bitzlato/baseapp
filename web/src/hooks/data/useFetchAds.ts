import { p2pUrl } from 'web/src/api/config';
import { buildQueryString } from 'web/src/helpers/buildQueryString';
import { fetchWithCreds } from 'web/src/helpers/fetch';
import { Advertisement, AdvertisementsParams } from 'web/src/modules/p2p/ad-types';
import { P2PList } from 'web/src/modules/p2p/p2p-types';
import { useFetch } from './useFetch';

export const useFetchAds = (params: AdvertisementsParams) => {
  return useFetch<P2PList<Advertisement>>(
    `${p2pUrl()}/exchange/dsa/?${buildQueryString(params)}`,
    fetchWithCreds,
  );
};
