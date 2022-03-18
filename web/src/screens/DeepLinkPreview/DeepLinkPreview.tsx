import { useState } from 'react';
import { useParams } from 'react-router';
import {
  Card,
  Container,
  DeeplinkActionType,
  DeepLinkInfo,
  deeplinkTitle,
} from 'web/src/components';
import { accountPublicUrl, p2pUrl } from 'web/src/api';
import { Box, Button, Spinner, Text } from 'web/src/components/ui';
import { useT } from 'web/src/hooks/useT';
import { loginWithRedirect } from 'web/src/helpers/auth0';
import { fetchJson } from 'web/src/helpers/fetch';
import { useFetch } from 'web/src/hooks/data/useFetch';

const useDeeplinkInfo = (deeplinkId: string) => {
  const { data, error, isValidating } = useFetch(
    `${accountPublicUrl()}/deeplinks/${deeplinkId}`,
    fetchJson,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    deeplink: data,
    isLoading: isValidating,
    isError: error,
  };
};

export const DeepLinkPreview: () => JSX.Element = () => {
  const t = useT();
  const { id: deeplinkId } = useParams<{ id: string }>();

  const [formAction, setFormAction] = useState(DeeplinkActionType.NoAction);
  const [actionResult, setActionResult] = useState({});
  const { deeplink, isLoading, isError } = useDeeplinkInfo(deeplinkId);

  const onDiscard = () => {
    // todo: passive action
    alert('Well ok');
  };

  const onDismiss = () => {
    // todo: passive action with exit/close
    alert('Navigate to root');
  };

  const onAccept = async () => {
    try {
      const json = await fetchJson(`${p2pUrl()}/deeplink/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: deeplinkId,
        }),
      });
      setActionResult({
        status: 200,
        payload: {
          code: json.code || '',
          message: json.message || '',
        },
      });
    } catch (error) {
      setActionResult({
        status: error.code || 500,
        payload: {
          code: 'ServerError',
          error,
        },
      });
    }
  };

  let actions;
  switch (formAction) {
    case DeeplinkActionType.LoginRequired:
      actions = (
        <Button color="primary" onClick={() => loginWithRedirect()}>
          {t('common.action.sign_in_up')}
        </Button>
      );
      break;
    case DeeplinkActionType.AcceptOrCancel:
      actions = (
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ mobile: 'column', tablet: 'row' }}
        >
          <Button color="primary" variant="outlined" onClick={onDiscard}>
            {t('common.action.discard')}
          </Button>
          <Button color="primary" variant="contained" onClick={onAccept}>
            {t('common.action.accept')}
          </Button>
        </Box>
      );
      break;
    case DeeplinkActionType.NoAction:
      actions = null;
      break;
    case DeeplinkActionType.Dismiss:
    default:
      actions = (
        <Button color="primary" onClick={onDismiss}>
          OK
        </Button>
      );
  }

  return (
    <Container maxWidth="md" my="4">
      <Card
        header={
          <Text variant="h4">{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</Text>
        }
      >
        <Box as="div">
          {isLoading && <Spinner animation="grow" />}
          {!isLoading && !isError && (
            <DeepLinkInfo
              actionResult={actionResult}
              deeplink={deeplink}
              exposeAction={setFormAction}
            />
          )}
        </Box>
        {actions}
      </Card>
    </Container>
  );
};
