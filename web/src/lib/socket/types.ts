export type EventNameType =
  | 'tradeStatusChanged'
  | 'tradeWillExpire'
  | 'tradeExtendWaitingTime'
  | 'disputeResolved'
  | 'disputeAvailable'
  | 'newChatMessage'
  | 'checkCashed'
  | 'moneyReceived'
  | 'userTradeStatusChanged'
  | 'accountsMerged'
  | 'blockChainMoneyReceived'
  | 'blockChainMoneySent'
  | 'comissionReturn'
  | 'disputeAvailableTenMinutes'
  | 'dividendsReceived'
  | 'freeze'
  | 'inactivityRatingDecline'
  | 'mute'
  | 'newAdminMessage'
  | 'newReferral'
  | 'unFreeze'
  | 'verificationDecision'
  | 'withdrawVoucherExpireFirst'
  | 'withdrawVoucherExpireSecond'
  | 'invoicePaid'
  | 'withdrawVoucherReceived'
  | 'merchantPaid'
  | 'adsPausedMessage'
  | 'adsActivatedMessage'
  | 'user24hInactivityMessage'
  | 'walletAddressDropped'
  | 'withdrawCanceled'
  | 'verificationReset';

type NotificationBase = {
  name: EventNameType;
  notificationId: number;
};

type NotificationVoucherReceived = NotificationBase & {
  userId: number;
  cryptocurrency: {
    code: string;
    amount: string;
  };
  currency: {
    code: string;
    amount: string;
  };
  donor: string;
};

type NotificationVoucherCashed = NotificationBase & {
  cryptocurrency: string;
  recipient: string;
  amount: string;
};

type MessageType = 'in' | 'out';

type NotificationNewMessage = NotificationBase & {
  to: string[];
  from: string;
  message: {
    id: number;
    created: number;
    message: string;
    file: any;
    type: MessageType;
  };
  tradeId: number | null;
  isAdmin: boolean;
  cryptocurrency: string | null;
};

type NotificationNewAdminMessage = NotificationBase & {
  message: string;
};

export type TradeStatus = 'trade_created' | 'cancel' | 'payment' | 'confirm-payment' | 'dispute';

export type NotificationTrade = NotificationBase & {
  tradeId: number;
  status: TradeStatus;
};

type NotificationTradeExtendTime = NotificationBase & {
  tradeId: number;
  time: number;
};

type NotificationTradeWillExpire = NotificationBase & NotificationTradeExtendTime;

type NotificationDisputeResolved = NotificationBase & {
  tradeId: number;
  status: 'win' | 'lose'; // уточнить тип
  cryptocurrency: {
    code: string;
    amount: string;
  };
};

export type TradeType = 'selling' | 'purchase';

type NotificationDisputeAvailable = NotificationBase & {
  type: TradeType;
  tradeId: number;
};

type NotificationDisputeAvailableTenMinutes = NotificationBase & {
  tradeId: number;
};

type NotificationTradeStatusChanged = NotificationBase & {
  tradeId: number;
};

type NotificationAccountsMerged = NotificationBase & {};
type NotificationInactivityRatingDecline = NotificationBase & {};
type NotificationAdsPausedMessage = NotificationBase & {};
type NotificationAdsActivatedMessage = NotificationBase & {};
type NotificationUser24hInactivityMessage = NotificationBase & {};
type NotificationWebAccountsMerged = NotificationBase & {};
type NotificationVerificationReset = NotificationBase & {};

type NotificationWithdrawCanceled = NotificationBase & {
  address: string;
  amount: string;
  cryptocurrency: string;
  fee: string;
};

type NotificationInvoicePaidToMerchant = NotificationBase & {
  invoiceId: number;
  userName: string;
  amount: string;
  cryptocurrency: string;
};

type NotificationMerchantPaid = NotificationBase & {
  amount: string;
  cryptocurrency: string;
  merchantName: string;
};

type NotificationWithdrawVoucherReceived = NotificationBase & {
  count: string;
};

type NotificationWalletAddressDropped = NotificationBase & {
  cryptocurrency: string;
};

type NotificationInvoicePaid = NotificationBase & {
  merchantName: string;
  invoiceId: number;
};

type NotificationWithdrawVoucherExpireFirst = NotificationBase & {
  count: number;
};

type NotificationWithdrawVoucherExpireSecond = NotificationWithdrawVoucherExpireFirst;

type FreezeType = 'all' | 'exchange_orders' | 'trades' | 'vouchers' | 'withdraw';

type NotificationFreeze = NotificationBase & {
  type: FreezeType[];
  expire: number;
  reason: string;
};

type NotificationUnFreeze = NotificationBase & {
  type: FreezeType[];
  reason: string;
};

type NotificationCommissionReturn = NotificationBase & {
  tradeId: number;
  amount: string;
  cryptocurrency: string;
};

type NotificationTipsReceived = NotificationBase & {
  tradeId: number;
  cryptocurrency: {
    amount: string;
    code: string;
  };
};

type NotificationMute = NotificationBase & {
  duration: string;
};

type NotificationVerificationDecision = NotificationBase & {
  status: boolean;
  reason?: string;
};

type NotificationBlockchainMoneyReceived = NotificationBase & {
  isDust: boolean;
  minAcceptableDeposit?: string;
  cryptocurrency: string | { code: string };
  amount: string;
  txid: number;
};

type NotificationBlockchainMoneySeizure = NotificationBase & {
  cryptocurrency: string;
  amount: string;
};

type NotificationBlockchainMoneyHold = NotificationBlockchainMoneySeizure;

type NotificationBlockchainMoneySent = NotificationBase & {
  amount: string;
  cryptocurrency: string;
};

type NotificationDividendsReceived = NotificationBase & {
  cryptocurrency: {
    amount: string;
    code: string;
  };
};

type NotificationNewReferral = NotificationBase & {
  referral: string;
};

export type IWebsocketMessage =
  | NotificationVoucherReceived
  | NotificationVoucherCashed
  | NotificationNewMessage
  | NotificationNewAdminMessage
  | NotificationTrade
  | NotificationTradeExtendTime
  | NotificationTradeWillExpire
  | NotificationDisputeResolved
  | NotificationDisputeAvailable
  | NotificationDisputeAvailableTenMinutes
  | NotificationNewReferral
  | NotificationDividendsReceived
  | NotificationAccountsMerged
  | NotificationBlockchainMoneySeizure
  | NotificationBlockchainMoneyHold
  | NotificationBlockchainMoneyReceived
  | NotificationBlockchainMoneySent
  | NotificationVerificationDecision
  | NotificationMute
  | NotificationInactivityRatingDecline
  | NotificationTipsReceived
  | NotificationCommissionReturn
  | NotificationFreeze
  | NotificationUnFreeze
  | NotificationWithdrawVoucherExpireFirst
  | NotificationWithdrawVoucherExpireSecond
  | NotificationInvoicePaid
  | NotificationWalletAddressDropped
  | NotificationWithdrawVoucherReceived
  | NotificationMerchantPaid
  | NotificationInvoicePaidToMerchant
  | NotificationAdsPausedMessage
  | NotificationAdsActivatedMessage
  | NotificationUser24hInactivityMessage
  | NotificationWebAccountsMerged
  | NotificationWithdrawCanceled
  | NotificationVerificationReset
  | NotificationTradeStatusChanged;

export interface IWebSocketTransport {
  connect: () => void;
  disconnect: () => void;
}

export type Notification = {
  id: number;
  name: string;
  data: any;
  read: boolean;
  createdAt?: number;
};

export type AdsPausedMessage = {
  createdAt: number;
  maxAllowedMarkup: null | number;
  minBalanceAllowed: null | number;
  fiatCurrency: string;
  cryptoCurrency: string;
};
