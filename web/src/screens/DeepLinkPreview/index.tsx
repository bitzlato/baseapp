import { FC } from 'react';
import { useParams } from 'react-router';
import { Card, Container, DeepLinkInfo, deeplinkTitle, useDeeplinkInfo } from 'web/src/components';
import { Spinner, Text } from 'web/src/components/ui';
import { useT } from 'web/src/hooks/useT';

export const DeepLinkPreview: FC = () => {
  const t = useT();
  const { id: deeplinkId } = useParams<{ id: string }>();

  const { deeplink, isLoading, isError } = useDeeplinkInfo(deeplinkId);

  return (
    <Container maxWidth="md" my="4">
      <Card
        header={
          <Text variant="h4">{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</Text>
        }
      >
        {isLoading && <Spinner animation="grow" />}
        {!isLoading && !isError && <DeepLinkInfo deeplink={deeplink} />}
      </Card>
    </Container>
  );
};
