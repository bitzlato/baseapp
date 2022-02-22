import { FC } from 'react';
import { translateTransformTags, useBetterT } from '../../hooks/useT';

type Props = {
  deeplink: DeepLinkInfoType;
  exposeAction: (action: DeeplinkActionType) => void;
};

enum DeeplinkTypes {
  Ad = 'ad',
  Voucher = 'voucher',
}

export enum DeeplinkActionType {
  NoAction,
  Dismiss,
  AcceptOrCancel,
  LoginRequired,
}

export type DeepLinkInfoType = {
  active: boolean;
  code: string;
  payload: never;
  referrer_id: number;
  type?: DeeplinkTypes;
};

export const deeplinkTitle = (deeplink: DeepLinkInfoType): string => {
  if (!deeplink || !deeplink.type) {
    return 'deeplink.cant_load';
  }

  switch (deeplink.type) {
    case DeeplinkTypes.Ad:
      return 'deeplink.ad.title';
    case DeeplinkTypes.Voucher:
      return 'deeplink.voucher.title';
    default:
      return 'deeplink.not_supported';
  }
};

export const DeepLinkInfo: FC<Props> = ({ deeplink, exposeAction }) => {
  const t = useBetterT();
  // todo: read profile status
  const isAuthorized = false;

  if (!deeplink) {
    return null;
  }

  let content = null;

  const renderAsVoucher = () => {
    const payload = deeplink.payload as any;
    const details = {
      totalFiat: 'xxx ' + payload.currency,
      totalCrypto: payload.amount + ' ' + payload.cc_code,
      user: payload.user.nickname,
      userLink: '/en/p2p/users/' + payload.user.nickname,
    };

    const info = [
      t(
        'deeplink.voucher.info',
        details,
        translateTransformTags,
      ),
    ];

    if (deeplink.active) {
      if (isAuthorized) {
        info.push(t('deeplink.profile.current_account', {
          userName: 'todo-er'
        }));
        info.push(t('deeplink.voucher.take_action'));
        exposeAction(DeeplinkActionType.AcceptOrCancel);
      } else {
        info.push(t('deeplink.profile.need_auth'));
        exposeAction(DeeplinkActionType.LoginRequired);
      }
    } else {
      if (payload.cashed_at) {
        info.push(t('deeplink.voucher.cashed'));
      } else {
        info.push(t('deeplink.voucher.expired'));
      }
      exposeAction(DeeplinkActionType.Dismiss);
    }

    return info.map((v) => <p>{v}</p>);
  };

  switch (deeplink.type) {
    case DeeplinkTypes.Voucher:
      content = renderAsVoucher();
      break;
  }

  return (
    <div>
      {content}
      <pre>{JSON.stringify(deeplink, null, '  ')}</pre>
    </div>
  );
};
