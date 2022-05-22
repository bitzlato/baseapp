import { TranslateFn } from 'web/src/hooks/useT';
import { AdsPausedMessage, Notification } from 'web/src/lib/socket/types';
import { NotificationModalNotification } from 'web/src/containers/NotificationModal/types';
import { Money } from '@bitzlato/money-js';
import { getFormatOptionsByLanguage } from 'web/src/components/AmountFormat/getFormatOptionsByLanguage';
import { Language } from 'web/src/types';

function calculationPercent(value: number): number {
  return Math.round(value * 100);
}

const PROFILE_URL = '/profile';
const WALLETS_URL = '/wallets';

export function notificationInfo(
  item: Notification,
  { translate, lang }: { translate: TranslateFn; lang: Language },
): NotificationModalNotification {
  const { createdAt } = item;
  const P2P_URL = `/${lang}/p2p`;
  const MERCH_URL = `/${lang}/merch`;

  const t = (key: string, args?: any) => translate(`notifications.${key}`, { ...args });

  switch (item.name) {
    case 'tradeStatusChanged': {
      const link = `${P2P_URL}/trades/${item.data.tradeId}`;
      switch (item.data.status) {
        case 'trade_created':
          return { text: t('tradeStatusChangedCreated', item.data), link, createdAt };
        case 'cancel':
          return { text: t('tradeStatusChangedCancel', item.data), link, createdAt };
        case 'payment':
          return { text: t('tradeStatusChangedPayment', item.data), link, createdAt };
        case 'confirm-payment':
          return { text: t('tradeStatusChangedConfirmPayment', item.data), link, createdAt };
        default:
          return { text: t('tradeStatusChanged', item.data), link, createdAt };
      }
    }
    case 'tradeExtendWaitingTime':
      return {
        text: t('tradeExtendWaitingTime', {
          tradeId: item.data.tradeId,
          time: item.data.time,
        }),
        link: `/en/${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    case 'tradeWillExpire': {
      const trade = item.data;
      if (trade.time > Date.now()) {
        return {
          text: t('tradeWillExpire', item.data),
          link: `${P2P_URL}/trades/${item.data.tradeId}`,
          createdAt,
        };
      }
      return {
        text: t('tradeExpired', item.data),
        link: `${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    }
    case 'disputeResolved':
      return {
        text: t(item.data.status === 'win' ? 'disputeSuccess' : 'disputeFail', {
          tradeId: item.data.tradeId,
          amount: item.data.cryptocurrency.amount,
          cryptocurrency: item.data.cryptocurrency.code,
        }),
        link: `${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    case 'disputeAvailable': {
      const msg =
        item.data.type === 'selling' ? 'disputeAvailableSelling' : 'disputeAvailablePurchase';
      return {
        text: t(msg),
        link: `${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    }
    case 'disputeAvailableTenMinutes': {
      return {
        text: t('disputeAvailableTenMinutes'),
        link: `${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    }
    case 'newChatMessage':
      if (item.data.tradeId) {
        return {
          text: t('newTradeMessage', {
            tradeId: item.data.tradeId,
          }),
          link: `${P2P_URL}/trades/${item.data.tradeId}`,
          createdAt,
        };
      }
      return {
        text: t('newChatMessage', {
          publicName: item.data.from,
        }),
        link: `${P2P_URL}/users/${item.data.from}`,
        createdAt,
      };

    case 'checkCashed':
      return {
        text: t('checkCashed', item.data),
        link: `${WALLETS_URL}/${item.data.cryptocurrency}`,
        createdAt,
      };
    case 'moneyReceived': {
      const nData = {
        cryptocurrencycode: item.data.cryptocurrency.code,
        cryptocurrencyamount: item.data.cryptocurrency.amount,
        currencyamount: Money.fromDecimal(item.data.currency.amount, {
          code: item.data.currency.code,
          minorUnit: 2,
        }).toFormat({ ...getFormatOptionsByLanguage(lang) }),
        currencycode: item.data.currency.code,
        donor: item.data.donor,
      };

      return {
        text: t('moneyReceived', nData),
        link: `${WALLETS_URL}/${item.data.cryptocurrency.code}`,
        createdAt,
      };
    }
    case 'userTradeStatusChanged':
      return {
        text: t('tradePause'),
        link: `${P2P_URL}/adverts/`,
        createdAt,
      };
    case 'newReferral':
      return {
        text: t('newReferral', {
          publicName: item.data.referral,
        }),
        link: `${PROFILE_URL}/referral`,
        createdAt,
      };
    case 'dividendsReceived': {
      const nData = {
        cryptocurrencycode: item.data.cryptocurrency.code,
        cryptocurrencyamount: item.data.cryptocurrency.amount,
      };

      return {
        text: t('dividendsReceived', nData),
        link: `${PROFILE_URL}/referral`,
        createdAt,
      };
    }

    case 'accountsMerged':
      return {
        text: t('Telegram and web accounts have been merged'),
        link: `${PROFILE_URL}/telegram`,
        createdAt,
      };
    case 'blockChainMoneyReceived':
      return item.data.isDust
        ? {
            text: t('wallet-balance-loaded-dust', item.data),
            link: `${WALLETS_URL}/${item.data.cryptocurrency.code}`,
            createdAt,
          }
        : {
            text: t('wallet-balance-loaded', item.data),
            link: `${WALLETS_URL}/${item.data.cryptocurrency}`,
            createdAt,
          };
    case 'blockChainMoneySent':
      return {
        text: t('payment-processed', item.data),
        link: `${WALLETS_URL}/${item.data.cryptocurrency}`,
        createdAt,
      };
    case 'verificationDecision':
      if (item.data.status) {
        return {
          text: t('verification-confirmed'),
          link: `${PROFILE_URL}`,
          createdAt,
        };
      }
      return {
        text: t('verification-rejected'),
        alert: t('verification-rejected-ext', { reason: item.data.reason }),
        createdAt,
      };

    case 'mute':
      return {
        text: t('mute', { duration: parseInt(item.data.duration, 10) }),
        alert: t('muteReason', { duration: parseInt(item.data.duration, 10) }),
        createdAt,
      };
    case 'inactivityRatingDecline':
      return {
        text: t('inactivityRatingDecline'),
        createdAt,
      };
    case 'tipsReceived': {
      const nData = {
        cryptocurrencycode: item.data.cryptocurrency.code,
        cryptocurrencyamount: item.data.cryptocurrency.amount,
        tradeId: item.data.tradeId,
      };

      return {
        text: t('tipsReceived', nData),
        link: `${P2P_URL}/trades/${item.data.tradeId}`,
        createdAt,
      };
    }
    case 'comissionReturn':
      return {
        text: t('comissionReturn', item.data),
        createdAt,
      };
    case 'freeze': {
      const type = item.data.type
        .split(',')
        .map((i: string) => t(`freezeType${i}`))
        .join(', ');

      return {
        text: t('freeze', { expire: new Date(item.data.expire) }),
        alert: t('freezeReason', {
          type,
          reason: item.data.reason,
          expire: new Date(item.data.expire),
        }),
        createdAt,
      };
    }
    case 'unFreeze': {
      const type = item.data.type
        .split(',')
        .map((i: string) => t(`freezeType${i}`))
        .join(', ');

      return {
        text: t('unFreeze'),
        alert: t('unFreezeReason', { type, reason: item.data.reason }),
        createdAt,
      };
    }
    case 'newAdminMessage':
      return {
        text: t('newAdminMessage'),
        alert: item.data.message,
        createdAt,
      };
    case 'withdrawVoucherExpireFirst':
      return {
        text: t('withdrawVoucherExpireFirst', item.data),
        createdAt,
      };
    case 'withdrawVoucherExpireSecond':
      return {
        text: t('withdrawVoucherExpireSecond', item.data),
        createdAt,
      };
    case 'invoicePaid':
      return {
        text: t('invoicePaid', item.data),
        createdAt,
      };
    case 'walletAddressDropped':
      return {
        text: t('walletAddressDropped', item.data),
        createdAt,
      };
    case 'withdrawVoucherReceived': {
      const lastCountDec = item.data.count
        .toString()
        .substr(item.data.count.toString().length - 1, 1);
      if (lastCountDec === '1') {
        return {
          text: t('withdrawVoucherReceived1', item.data),
          createdAt,
        };
      }

      if (['2', '3', '4'].includes(lastCountDec)) {
        return {
          text: t('withdrawVoucherReceived234', item.data),
          createdAt,
        };
      }
      return {
        text: t('withdrawVoucherReceived', item.data),
        createdAt,
      };
    }
    case 'merchantPaid':
      return {
        text: t('merchantPaid', item.data),
        createdAt,
      };
    case 'invoicePaidToMerchant':
      return {
        text: t('invoicePaidToMerchant', item.data),
        link: `${MERCH_URL}/dashboard`,
        createdAt,
      };
    case 'adsPausedMessage': {
      const adsPausedMessage: AdsPausedMessage = item.data;

      let text = t('adsPausedMessage');

      if (adsPausedMessage.maxAllowedMarkup && !adsPausedMessage.minBalanceAllowed) {
        const maxAllowedMarkup = calculationPercent(adsPausedMessage.maxAllowedMarkup);
        text = t('adsPausedMessage_maxAllowedMarkup', { maxAllowedMarkup });
      }

      if (adsPausedMessage.minBalanceAllowed) {
        text = t('adsPausedMessage_minBalanceAllowed', {
          minBalance: adsPausedMessage.minBalanceAllowed,
          cryptocurrency: adsPausedMessage.cryptoCurrency,
          currency: adsPausedMessage.fiatCurrency,
        });
      }

      return {
        text,
        createdAt,
      };
    }
    case 'adsActivatedMessage':
      return {
        text: t('adsActivatedMessage'),
        createdAt,
      };
    case 'user24hInactivityMessage':
      return {
        text: t('user24hInactivityMessage'),
        createdAt,
      };
    case 'withdrawCanceled':
      return {
        text: t('withdrawCanceled', item.data),
        createdAt,
      };
    case 'verificationReset':
      return {
        text: t('verificationReset', item.data),
        link: `${PROFILE_URL}/verification`,
        createdAt,
      };
    case 'webAccountsMerged':
      return {
        text: t('webAccountsMerged'),
        createdAt,
      };
    default:
      return {
        text: t('item.name'),
        createdAt,
      };
  }
}