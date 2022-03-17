import { FC, useState } from 'react';
import { useParams } from 'react-router';
import useSWR, { SWRConfiguration } from 'swr';
import { Spinner } from 'react-bootstrap';
import { DeeplinkActionType, DeepLinkInfo, deeplinkTitle } from '../../components';
import { accountPublicUrl, p2pUrl } from '../../api';
import { Card } from '../../components/Card/Card';
import { Box } from '../../components/ui/Box';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/Container/Container';
import { useT } from '../../hooks/useT';
import { loginWithRedirect } from '../../helpers/auth0';

// todo: move swr config to top-level
const swrConfig: SWRConfiguration = {
  refreshInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
};

const useDeeplinkInfo = (deeplinkId: string) => {
  const { data, error, isValidating } = useSWR(
    `${accountPublicUrl()}/deeplinks/${deeplinkId}`,
    swrConfig,
  );

  return {
    deeplink: data,
    isLoading: isValidating,
    isError: error,
  };
};

export const DeepLinkPreview: FC = () => {
  const t = useT();
  const { id: deeplinkId } = useParams<{ id: string }>();

  const [formAction, setFormAction] = useState(DeeplinkActionType.NoAction);
  const [actionResult, setActionResult] = useState({});
  const { deeplink, isLoading, isError } = useDeeplinkInfo(deeplinkId);

  const renderBody = () => {
    if (isLoading) {
      return <Spinner animation="grow" />;
    }

    if (isError) {
      return <pre>Error: {JSON.stringify(isError)}</pre>;
    }

    return (
      <DeepLinkInfo actionResult={actionResult} deeplink={deeplink} exposeAction={setFormAction} />
    );
  };

  const onDiscard = () => {
    alert('Well ok');
  };

  const onDismiss = () => {
    alert('Navigate to root');
  };

  const onAccept = () => {
    fetch(`${p2pUrl()}/deeplink/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: deeplinkId,
      }),
    })
      .then((response) => {
        response
          .json()
          .then((body) => {
            setActionResult({
              status: response.status,
              payload: {
                code: body.code || '',
                message: body.message || '',
              },
            });
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((error) => {
        setActionResult({
          status: 500,
          payload: {
            code: 'NetworkError',
            error: error,
          },
        });
      });
  };

  const renderActions = () => {
    switch (formAction) {
      case DeeplinkActionType.LoginRequired:
        return (
          <Button color="primary" onClick={() => loginWithRedirect()}>
            {t('common.action.sign_in_up')}
          </Button>
        );
      case DeeplinkActionType.AcceptOrCancel:
        return (
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
      case DeeplinkActionType.NoAction:
        return null;
      case DeeplinkActionType.Dismiss:
      default:
        return (
          <Button color="primary" onClick={onDismiss}>
            OK
          </Button>
        );
    }
  };

  return (
    <Container maxWidth="md" my="4">
      <Card header={<h4>{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</h4>}>
        <Box as="p">{renderBody()}</Box>
        {renderActions()}
      </Card>
    </Container>
  );
};
