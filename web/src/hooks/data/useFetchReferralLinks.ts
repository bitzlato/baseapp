import { p2pUrl } from 'web/src/api/config';
import { ReferralLink } from 'web/src/modules/user/profile/types';
import { useFetch } from './useFetch';

export const useFetchReferralLinks = () =>
  useFetch<{
    fee?: string | null | undefined;
    links: ReferralLink[];
  }>(`${p2pUrl()}/profile/referral-links`);
