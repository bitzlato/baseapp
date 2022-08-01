import { PaymethodSource } from 'web/src/modules/p2p/types';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { Theme } from 'web/src/types';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';

export enum AdsType {
  purchase = 'purchase',
  selling = 'selling',
}

export type Trade = {
  id: number;
  rate: number;
  type: AdsType;
  status: TradeStatus;
  currency: {
    code: string;
    amount: number;
    paymethod?: number;
  };
  cryptocurrency: {
    code: string;
    amount: number;
  };
  paymethod: PaymethodSource;
  terms: string | null;
  details: string;
  counterDetails: string;
  fee: string;
  availableActions: TradeAvailableAction[];
  disputeAvailable: boolean;
  waitingTimeIncreased: boolean;
  owner: boolean;
  history: {
    date: string;
    status: TradeStatus;
  }[];
  partner: UserInfo;
  times: {
    created: string;
    autocancel: string | null;
    dispute: string | null;
  };
  promptDetails?: boolean;
};

export type TradeInfo = Trade & {
  partner: string;
};

export type TradeAvailableAction =
  | 'cancel'
  | 'tips'
  | 'dispute'
  | 'addtime'
  | 'confirm-trade'
  | 'payment'
  | 'confirm-payment'
  | 'feedback';

export enum TradeStatus {
  CONFIRM_TRADE = 'confirm_trade',
  PAYMENT = 'payment',
  CONFIRM_PAYMENT = 'confirm_payment',
  DISPUTE = 'dispute',
  CANCEL = 'cancel',
  TRADE_CREATED = 'trade_created',
}

export type Tabs = 'tradeInfo' | 'chat';
export type MobileTabs = 'trader' | 'trade';
export type TradeModals =
  | 'details'
  | 'confirmCancel'
  | 'confirmPayment'
  | 'tips'
  | 'disputeReason'
  | 'ask2fa';
export type TradeFeedback = 'thumb_up' | 'weary' | 'hankey';
export interface TradeContextValue {
  trade: Trade;
  handleTradeAction: (action: TradeAvailableAction, twoFACode?: string) => void;
  handleTradeTimeout: () => void;
  handleTradeDetails: (details: string, onSuccess?: () => void) => void;
  handleTradeTips: (tipsAmount: number) => void;
  handleTrustUser: (flag: boolean, publicName: string) => void;
  handleTradeFeedback: (code: TradeFeedback) => void;
  handleOpenDispute: (reason: string | undefined) => void;
  modals: { [key in TradeModals]: boolean };
  toggleModal: (modal: TradeModals) => void;
  t: SharedTranslateFn;
  theme: Theme;
  formattedTradeValues: { currency: string; cryptocurrency: string };
}
export interface ISharedTrade extends TradeContextValue {}
