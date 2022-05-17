export interface DealStat {
  canceledDeals: number;
  cryptocurrency: string;
  defeatInDisputes: number;
  successDeals: number;
  totalAmount: string;
  totalCount: number;
}

export interface Feedback {
  count: number;
  type: 'thumb_up' | 'hunkey';
}

export interface UserInfo {
  blacklistedTimes: null;
  blocked: null;
  chatAvailable: null;
  dealStats: DealStat[];
  deeplinkCode: string;
  feedbacks: Feedback[];
  greeting: null;
  id: number;
  lastActivity: number;
  name: string;
  rating: number;
  regPeriod: null;
  safetyIndex: number;
  startOfUseDate: number;
  suspicious: boolean;
  trusted: null;
  trustsCount: number;
  verification: boolean;
  verificationProvider: 'LEGACY';
}
