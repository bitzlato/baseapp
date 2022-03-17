import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useT } from '../../hooks/useT';
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
  const t = useT();
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
      totalFiat: payload.converted_amount && `(${payload.converted_amount} ${payload.currency})`,
      totalCrypto: `${payload.amount} ${payload.cc_code}`,
      user: payload.user.nickname,
      userLink: `/en/p2p/users/${payload.user.nickname}`,
      comment: payload.comment,
    };

    const info = [
      <div
        className={sprinkles({
          pb: '3x',
        })}
      >
        <p>{t('deeplink.voucher.info', details)}</p>
        {details.comment && <p>{t('deeplink.voucher.comment', details)}</p>}
      </div>,
    ];

    if (actionResult && actionResult.status) {
      // action took
      if (actionResult.status === 200) {
        // cashed!
        info.push(
          <h3 className={sprinkles({ color: 'success' })}>{t('deeplink.voucher.just_cashed')}</h3>,
        );
      } else {
        info.push(
          <h3 className={sprinkles({ color: 'danger' })}>{t('deeplink.voucher.cash_failed')}</h3>,
        );
        if (actionResult.payload && actionResult.payload.code) {
          info.push(<p>{t(`deeplink.server.${actionResult.payload.code}`)}</p>);
        }
      }

      // set dismiss button
      exposeAction(DeeplinkActionType.Dismiss);
    } else {
      // action pending
      // eslint-disable-next-line no-lonely-if
      if (deeplink.active) {
        if (isAuthorized) {
          info.push(
            <p>
              {t('deeplink.profile.current_account', {
                userName: user.username || user.email,
              })}
            </p>,
            <p>{t('deeplink.voucher.take_action')}</p>,
          );
          exposeAction(DeeplinkActionType.AcceptOrCancel);
        } else {
          info.push(<p>{t('deeplink.profile.need_auth')}</p>);
          exposeAction(DeeplinkActionType.LoginRequired);
        }
      } else {
        if (payload.cashed_at) {
          info.push(
            <p className={sprinkles({ color: 'danger' })}>
              {t('deeplink.voucher.cashed', { cashed_at: payload.cashed_at })}
            </p>,
          );
        } else {
          info.push(<p>{t('deeplink.voucher.expired')}</p>);
        }
        exposeAction(DeeplinkActionType.Dismiss);
      }
    }

    return info.map((v, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <Fragment key={i}>{v}</Fragment>;
    });
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
    <div
      className={sprinkles({
        fontSize: 'medium',
      })}
    >
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
