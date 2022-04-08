import { FC, ReactNode, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useMutation from 'use-mutation';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Spinner } from 'web/src/components/ui/Spinner';
import { p2pUrl } from 'web/src/api';
import { FetchError, fetchJson } from 'web/src/helpers/fetch';
import { useT } from 'web/src/hooks/useT';
import {
  RootState,
  selectCurrentLanguage,
  selectUserFetching,
  selectUserInfo,
  selectUserLoggedIn,
} from 'web/src/modules';
import { DeepLinkInfoType, DeeplinkPayloadVoucher } from './types';

interface Props {
  deeplink: DeepLinkInfoType;
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
  } catch (e) {
    const error = e as FetchError;
    const payload = {
      statusCode: error.payload.statusCode || error.code || 500,
      code: error.payload.code || 'ServerError',
      message: error.payload.message || error.message,
    };
    throw new FetchError(payload.message, payload.statusCode, payload);
  }
};

const InfoBubble = ({ children }: { children: ReactNode }) => {
  return (
    <Box px="4x" py="3x" my="3x" borderRadius="2x" bg="infoBg">
      {children}
    </Box>
  );
};

export const VoucherInfo: FC<Props> = ({ deeplink }) => {
  const t = useT();
  const { currentLanguageCode, isAuthorized, isCheckingAuth, user } = useSelector(
    (state: RootState) => ({
      currentLanguageCode: selectCurrentLanguage(state),
      isCheckingAuth: selectUserFetching(state),
      isAuthorized: selectUserLoggedIn(state),
      user: selectUserInfo(state),
    }),
  );
  const history = useHistory();
  const payload = deeplink.payload as DeeplinkPayloadVoucher;

  // gather variables that can be used in informational messages
  const details = {
    totalCrypto: <strong>{`${payload.amount} ${payload.cc_code}`}</strong>,
    totalFiat: payload.converted_amount && (
      <strong>{`(${payload.converted_amount} ${payload.currency})`}</strong>
    ),
    user: (
      <a
        href={`/${currentLanguageCode}/p2p/users/${payload.user.profile_name}`}
        target="_blank"
        rel="noreferrer"
      >
        {payload.user.profile_name}
      </a>
    ),
    comment: payload.comment,
  };

  // activation process
  const [isActivating, setIsActivating] = useState(false);
  const [activationResult, setActivationResult] = useState<{
    done: boolean;
    success: boolean;
    message: ReactNode;
  }>({
    done: false,
    success: false,
    message: null,
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
          <InfoBubble>
            <Box fontSize="large" color="success">
              {t('deeplink.voucher.just_cashed')}
            </Box>
          </InfoBubble>
        ),
      });
    },
    onFailure(params: { error: Error | { payload: ActivationResult } }): Promise<void> | void {
      const errorCode = 'payload' in params.error ? params.error.payload.code : null;
      setActivationResult({
        done: true,
        success: false,
        message: (
          <InfoBubble>
            <Box fontSize="large" color="danger">
              {t('deeplink.voucher.cash_failed')}
            </Box>
            {errorCode && <Box>{t(`deeplink.server.${errorCode}`)}</Box>}
          </InfoBubble>
        ),
      });
    },
  });

  let infoMessage: ReactNode = null;
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
          <Box
            display="flex"
            my="4x"
            justifyContent="space-between"
            alignItems="center"
            fontSize="caption"
            color="textMuted"
          >
            <span>{t('deeplink.profile.current_account_label')}</span>
            <span>{user.username || user.email}</span>
          </Box>
        );
      }
    } else if (payload.cashed_at) {
      infoMessage = (
        <Box pt="4x" px="2x" textAlign="center" color="danger">
          {t('deeplink.voucher.cashed', {
            cashed_at: new Date(payload.cashed_at).toLocaleString(),
          })}
        </Box>
      );
    } else {
      infoMessage = <Box>{t('deeplink.voucher.expired')}</Box>;
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

  const spacer = <Box w="4x" h="4x" flexShrink={0} />;

  const actionButtons = () => {
    if (isCheckingAuth) {
      return <Spinner />;
    }

    if (isAuthRequired) {
      const botLink = payload.links?.find((link) => link.type === 'telegram');

      return (
        <>
          {botLink && (
            <Button
              as="a"
              href={botLink.url}
              color="secondary"
              variant="outlined"
              fullWidth
            >
              {botLink.label}
            </Button>
          )}
          {spacer}
          <Button color="primary" fullWidth onClick={goAuth}>
            {t('common.action.sign_in_up')}
          </Button>
        </>
      );
    }

    if (!canTakeAction) {
      return null;
    }

    return (
      <>
        <Button
          disabled={isActivating}
          onClick={onDiscard}
          color="secondary"
          variant="outlined"
          fullWidth
        >
          {t('common.action.discard')}
        </Button>
        {spacer}
        <Button
          disabled={isActivating}
          onClick={onAccept}
          color="secondary"
          variant="contained"
          fullWidth
        >
          {isActivating ? t('common.action.accepting') : t('common.action.accept')}
        </Button>
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box pb="3x">
        <Box lineHeight="oneHalf">{t('deeplink.voucher.info', details)}</Box>
        {details.comment && (
          <InfoBubble>
            <Box color="textMuted" fontSize="caption" mb="2x">
              {t('deeplink.voucher.comment_label')}
            </Box>
            <Box>{details.comment}</Box>
          </InfoBubble>
        )}
        {infoMessage}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        flexDirection={{ mobile: 'column-reverse', tablet: 'row' }}
      >
        {actionButtons()}
      </Box>
    </Box>
  );
};
