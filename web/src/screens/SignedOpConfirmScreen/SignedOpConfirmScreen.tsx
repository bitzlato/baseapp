import { FC, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSignedOpConfirm } from 'web/src/hooks/data/useSignedOpConfirm';
import { getSearchParam, setLocation } from 'web/src/helpers/url';
import { Box } from 'web/src/components/ui/Box';
import { SignedOpsModal } from 'web/src/containers/SignedOpsModal/SignedOpsModal';
import { p2pRoutesProfile, p2pRoutesWallets } from 'web/src/api';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { ISignedOpCommand, SignedOpsResult } from './types';

const PROFILE_URL = p2pRoutesProfile();
const WALLETS_URL = p2pRoutesWallets();
const KNOWN_ERROR_LIST = [
  'TokenIsExpired',
  'TokenIsNotFound',
  'MalformedToken',
  'NotAllowed',
  'Failed',
];

export const SignedOpConfirmScreen: FC = () => {
  const t = useT();
  const history = useHistory();
  const location = useLocation();
  const confirmationToken = useMemo(
    () => getSearchParam('token', location.search) || '',
    [location],
  );

  const { data, error: requestError } = useSignedOpConfirm(confirmationToken);

  const { message, actionBlock, isSuccess } = useMemo(() => {
    const memoized: {
      message: null | string;
      actionBlock: null | JSX.Element;
      isSuccess: boolean;
    } = {
      message: null,
      actionBlock: null,
      isSuccess: false,
    };

    if (requestError && requestError.message) {
      memoized.message =
        requestError.code === 401 ? t('signed.error.auth') : t('signed.error.subtitle');

      memoized.actionBlock = (
        <Box display="flex" flexGrow={0.5} mx="auto">
          <Button
            fullWidth
            size="small"
            color="secondary"
            onClick={() =>
              setLocation(`/signin?back=${location.pathname + location.search}`, history)
            }
          >
            {t('Login')}
          </Button>
        </Box>
      );

      return memoized;
    }

    if (data && data.error) {
      memoized.message = KNOWN_ERROR_LIST.includes(data.error)
        ? t(`signed.error.${data.error}`)
        : t('signed.error.subtitle');

      memoized.actionBlock = (
        <Box display="flex" flexGrow={1}>
          <Box marginRight="1x" w="full">
            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setLocation(PROFILE_URL, history)}
            >
              {t('Cancel')}
            </Button>
          </Box>

          <Box marginLeft="1x" w="full">
            <Button
              fullWidth
              size="small"
              color="secondary"
              onClick={() => setLocation(WALLETS_URL, history)}
            >
              {t('Try again')}
            </Button>
          </Box>
        </Box>
      );

      return memoized;
    }

    if (data && data.result) {
      const { result = {}, command } = data as Omit<SignedOpsResult, 'to'>;

      memoized.isSuccess = true;
      memoized.message = t(`signed.command.${command}`);

      if (command === ISignedOpCommand.API_KEY_CREATED) {
        const { aud = 'usr' } = result;
        const i18Key = `${command}-${aud}`; // 'ApiKey.Create-usr' or 'ApiKey.Create-mob'
        memoized.message = t(`signed.command.${i18Key}`);
      }

      const cryptocurrency = result.cryptocurrency?.code.toLowerCase();

      let redirectUrl = PROFILE_URL;

      if (command === ISignedOpCommand.WITHDRAW_SUBMIT) {
        redirectUrl = cryptocurrency ? `${WALLETS_URL}/${cryptocurrency}/withdraw` : PROFILE_URL;
      }

      if (command === ISignedOpCommand.VOUCHER_CREATE) {
        redirectUrl = cryptocurrency ? `${WALLETS_URL}/${cryptocurrency}/gift` : PROFILE_URL;
      }

      memoized.actionBlock = (
        <Box display="flex" flexGrow={0.5} mx="auto">
          <Button
            fullWidth
            size="small"
            color="secondary"
            onClick={() => setLocation(redirectUrl, history)}
          >
            {t('Forward')}
          </Button>
        </Box>
      );
    }

    return memoized;
  }, [data, requestError, t, history, location]);

  const handleClose = useCallback(() => setLocation(PROFILE_URL, history), [history]);

  return message && actionBlock ? (
    <SignedOpsModal
      message={<span>{message}</span>}
      isSuccess={isSuccess}
      actionBlock={actionBlock}
      handleClose={handleClose}
    />
  ) : null;
};
