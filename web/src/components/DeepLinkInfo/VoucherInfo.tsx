import { FC, ReactElement, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useMutation from 'use-mutation';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { p2pUrl } from 'web/src/api';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { useT } from 'web/src/hooks/useT';
import { selectUserInfo, selectUserLoggedIn } from 'web/src/modules';
import { DeepLinkInfoType, DeeplinkPayloadVoucher } from './types';

interface Props {
  deeplink: DeepLinkInfoType & {
    payload: DeeplinkPayloadVoucher;
  };
}

interface ActivationResult {
  statusCode: number;
  code: string;
  message?: string;
}

const activateVoucher = async (voucherCode: string): Promise<ActivationResult> => {
  try {
    const json = await fetchJson(`${p2pUrl()}/deeplink/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: voucherCode,
      }),
    });
    return {
      statusCode: 200,
      code: json.code || '',
      message: json.message || '',
    };
  } catch (error: FetchError) {
    const payload = {
      statusCode: error.payload.statusCode || error.code || 500,
      code: error.payload.code || 'ServerError',
      message: error.payload.message || error.message,
    };
    throw new FetchError(payload.message, payload.statusCode, payload);
  }
};

export const VoucherInfo: FC<Props> = ({ deeplink }) => {
  const t = useT();
  const isAuthorized = useSelector(selectUserLoggedIn);
  const user = useSelector(selectUserInfo);
  const history = useHistory();
  const { payload } = deeplink;

  // gather variables that can be used in informational messages
  const details = {
    totalFiat: payload.converted_amount && `(${payload.converted_amount} ${payload.currency})`,
    totalCrypto: `${payload.amount} ${payload.cc_code}`,
    // todo: resolve real permalink to user profile
    user: (
      <a href={`#/p2p/users/${payload.user.nickname}`} target="_blank" rel="noreferrer">
        {payload.user.nickname}
      </a>
    ),
    comment: payload.comment,
  };

  // activation process
  const [isActivating, setIsActivating] = useState(false);
  const [activationResult, setActivationResult] = useState({
    done: false,
    success: false,
    message: null as ReactElement,
  });

  const [activate] = useMutation(activateVoucher, {
    onMutate() {
      setIsActivating(true);
      return () => {
        setIsActivating(false);
      };
    },
    onSuccess(): Promise<void> | void {
      setActivationResult({
        done: true,
        success: true,
        message: (
          <Text variant="h3" color="success">
            {t('deeplink.voucher.just_cashed')}
          </Text>
        ),
      });
    },
    onFailure(params: { error: Error | { payload: ActivationResult } }): Promise<void> | void {
      const errorCode = 'payload' in params.error ? params.error.payload.code : null;
      setActivationResult({
        done: true,
        success: false,
        message: (
          <>
            <Text variant="h4" color="danger">
              {t('deeplink.voucher.cash_failed')}
            </Text>
            {errorCode && <Text>{t(`deeplink.server.${errorCode}`)}</Text>}
          </>
        ),
      });
    },
  });

  let infoMessage: ReactElement | null = null;
  let isAuthRequired = false;
  let canTakeAction = false;

  if (activationResult.done) {
    // voucher activated
    infoMessage = activationResult.message;
  } else {
    // eslint-disable-next-line no-lonely-if
    if (deeplink.active) {
      if (!isAuthorized) {
        isAuthRequired = true;
      } else {
        canTakeAction = true;

        infoMessage = (
          <>
            <p>
              {t('deeplink.profile.current_account', {
                userName: user.username || user.email,
              })}
            </p>
            <p>{t('deeplink.voucher.take_action')}</p>
          </>
        );
      }
    } else if (payload.cashed_at) {
      infoMessage = (
        <Text color="danger">{t('deeplink.voucher.cashed', { cashed_at: payload.cashed_at })}</Text>
      );
    } else {
      infoMessage = <Text>{t('deeplink.voucher.expired')}</Text>;
    }
  }

  // accepting: call mutation
  const onAccept = useCallback(() => {
    activate(deeplink.code);
  }, [activate, deeplink]);

  // auth/signup with redirect back here
  const goAuth = () => {
    history.push(`/signin?back=${window.location.pathname}`);
  };

  // passive action: decline voucher
  const onDiscard = () => {
    history.push('/wallets');
  };

  // action after voucher redeem performed
  const onDismiss = () => {
    history.push('/wallets');
  };

  const actionButtons = () => {
    if (isAuthRequired) {
      return (
        <Button color="primary" onClick={goAuth}>
          {t('common.action.sign_in_up')}
        </Button>
      );
    }

    if (!canTakeAction) {
      return (
        <Button color="primary" onClick={onDismiss}>
          OK
        </Button>
      );
    }

    return (
      <>
        <Button disabled={isActivating} color="primary" variant="outlined" onClick={onDiscard}>
          {t('common.action.discard')}
        </Button>
        <Button disabled={isActivating} color="primary" variant="contained" onClick={onAccept}>
          {isActivating ? t('common.action.accepting') : t('common.action.accept')}
        </Button>
      </>
    );
  };

  return (
    <Box>
      <Box pb="3x">
        <p>{t('deeplink.voucher.info', details)}</p>
        {details.comment && <p>{t('deeplink.voucher.comment', details)}</p>}
        {infoMessage}
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ mobile: 'column', tablet: 'row' }}
      >
        {actionButtons()}
      </Box>
    </Box>
  );
};
