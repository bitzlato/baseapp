export type AdvertisementType = 'purchase' | 'selling';

export interface AdvertisementsParams {
  limit: number;
  skip: number;
  type: AdvertisementType;
  currency: string;
  cryptocurrency: string;
  isOwnerVerificated: boolean;
  isOwnerTrusted: boolean;
  isOwnerActive: boolean;
  paymethod: number;
  lang: string;
}

export interface AdvertisementLimit {
  min: string;
  max: string;
  realMax: null;
}

export interface Paymethod {
  id: number;
  name: string;
}

export interface Advertisement {
  available: boolean;
  cryptocurrency: string;
  currency: string;
  id: number;
  isOwnerVerificated: boolean;
  limitCryptocurrency: AdvertisementLimit;
  limitCurrency: AdvertisementLimit;
  owner: string;
  ownerBalance: null;
  ownerLastActivity: number;
  ownerTrusted: boolean;
  paymethod: Paymethod;
  rate: string;
  safeMode: boolean;
  type: AdvertisementType;
  unactiveReason: null;
}
