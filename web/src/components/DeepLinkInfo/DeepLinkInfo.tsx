import { FC } from 'react';
import { useSelector } from 'react-redux';
import { translateTransformTags, useBetterT } from '../../hooks/useT';
import { selectUserInfo, selectUserLoggedIn } from '../../modules';
import { sprinkles } from '../../theme/sprinkles.css';

type Props = {
  actionResult: DeepLinkActionResultType;
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
  status?: number;
  payload?: any;
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
  const isLocalDev = false;

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

    const info = [
      <div
        className={sprinkles({
          pb: '3x',
          fontSize: 'medium',
        })}
      >
        {t('deeplink.voucher.info', details, translateTransformTags)}
      </div>,
    ];

    if (actionResult && actionResult.status) {
      // action took
      if (actionResult.status === 200) {
        // cashed!
        info.push(<h3>{t('deeplink.voucher.cashed')}</h3>);
      } else {
        info.push(<h3>{t('deeplink.voucher.cash_failed')}</h3>);
        if (actionResult.payload && actionResult.payload.code) {
          info.push(t(`deeplink.server.${actionResult.payload.code}`));
        }
      }

      // set dismiss button and exit
      exposeAction(DeeplinkActionType.Dismiss);
      return info.map((v) => <div>{v}</div>);
    } else {
      // action pending
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
      {isLocalDev && (
        <pre>
          Raw data:
          {JSON.stringify(deeplink, null, '  ')}
          ActionResult:
          {JSON.stringify(actionResult, null, '  ')}
        </pre>
      )}
    </div>
  );
};
