import { FC } from 'react';
import { useSelector } from 'react-redux';
import { translateTransformTags, useBetterT } from '../../hooks/useT';
import { selectUserInfo, selectUserLoggedIn } from '../../modules';

type Props = {
  actionResult: (result: DeepLinkActionResultType) => void;
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

export type DeepLinkActionResultType = {
  success: boolean;
  payload: any;
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

export const DeepLinkInfo: FC<Props> = ({ actionResult, deeplink, exposeAction }) => {
  const t = useBetterT();
  const isAuthorized = useSelector(selectUserLoggedIn);
  const user = useSelector(selectUserInfo);

  if (!deeplink) {
    return null;
  }

  let content = null;

  // voucher
  const renderAsVoucher = () => {
    const payload = deeplink.payload as any;
    const details = {
      totalFiat: `xxx ${payload.currency}`,
      totalCrypto: `${payload.amount} ${payload.cc_code}`,
      user: payload.user.nickname,
      userLink: `/en/p2p/users/${payload.user.nickname}`,
    };

    if (actionResult && actionResult.success) {
      debugger;
    }

    const info = [t('deeplink.voucher.info', details, translateTransformTags)];

    if (deeplink.active) {
      if (isAuthorized) {
        info.push(
          t('deeplink.profile.current_account', {
            userName: user.username || user.email,
          }),
        );
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

  // advertisement
  const renderAsAd = () => {
    exposeAction(DeeplinkActionType.Dismiss);

    return null;
  };

  switch (deeplink.type) {
    case DeeplinkTypes.Voucher:
      content = renderAsVoucher();
      break;
    case DeeplinkTypes.Ad:
      content = renderAsAd();
      break;
    default:
      break;
  }

  return (
    <div>
      {content}
      <pre>
        Raw data:
        {JSON.stringify(deeplink, null, '  ')}
      </pre>
      {actionResult && (
        <pre>
          ActionResult:
          {JSON.stringify(actionResult, null, '  ')}
        </pre>
      )}
    </div>
  );
};
