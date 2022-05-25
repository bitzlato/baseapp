export interface DealStat {
  canceledDeals: number;
  cryptocurrency: string | 'common';
  defeatInDisputes: number;
  successDeals: number;
  totalAmount: string;
  totalCount: number;
}

export interface Feedback {
  count: number;
  type: 'thumb_up' | 'hankey';
}

export interface UserInfo {
  blacklistedTimes: number | null;
  blocked: boolean | null;
  chatAvailable: boolean | null;
  dealStats: DealStat[];
  deeplinkCode: string;
  feedbacks: Feedback[];
  greeting: null;
  id: number;
  lastActivity: number;
  name: string;
  rating: number;
  regPeriod: number | null;
  safetyIndex: number;
  startOfUseDate: number;
  suspicious: boolean;
  trusted: boolean | null;
  trustsCount: number;
  verification: boolean;
  verificationStatus: 'VERIFIED' | 'NOT_VERIFIED' | 'NOT_REQUIRED';
  verificationProvider: 'LEGACY';
}

export interface TrustParams {
  trust: boolean;
}
