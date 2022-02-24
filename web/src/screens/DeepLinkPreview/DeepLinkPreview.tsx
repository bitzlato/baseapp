import { FC, useState } from 'react';
import { useParams } from 'react-router';
import useSWR, { SWRConfiguration } from 'swr';
import { Spinner } from 'react-bootstrap';
import { DeeplinkActionType, DeepLinkInfo, deeplinkTitle } from '../../components';
import { accountPublicUrl } from '../../api';
import { Card } from '../../components/Card/Card';
import { Box } from '../../components/ui/Box';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/Container/Container';
import { useT } from '../../hooks/useT';
import { loginWithRedirect } from '../../helpers/auth0';

// localhost samples: voucher: http://localhost:8080/deeplinks/c_2fc37b33410cb6e483fc690f16cc3bdf
// ad on: http://localhost:8080/deeplinks/a_13cbR
// ad off: http://localhost:8080/deeplinks/a_13cbS

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
  const { deeplink, isLoading, isError } = useDeeplinkInfo(deeplinkId);

  const renderBody = () => {
    if (isLoading) {
      return <Spinner animation="grow" />;
    }

    if (isError) {
      return <pre>Error: {JSON.stringify(isError)}</pre>;
    }

    return <DeepLinkInfo deeplink={deeplink} exposeAction={setFormAction} />;
  };

  const onDiscard = () => {
    alert('Well ok');
  };

  const onDismiss = () => {
    alert('Fine');
  };

  const onAccept = () => {
    // todo: make request to private api
    alert('Nice!');
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
          <Button size="large" color="primary" onClick={onDismiss}>
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
