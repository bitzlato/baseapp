import { FC } from 'react';
import { useParams } from 'react-router';
import { Card, Container, DeepLinkInfo, deeplinkTitle } from 'web/src/components';
import { useT } from 'web/src/hooks/useT';
import { useDeepLinkInfo } from 'web/src/hooks/data/useDeepLinkInfo';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Text } from 'web/src/components/ui/Text';

export const DeepLinkPreview: FC = () => {
  const t = useT();
  const { id: deeplinkId } = useParams<{ id: string }>();

  const { deeplink, isLoading, isError } = useDeepLinkInfo(deeplinkId);

  let body;
  if (isLoading) {
    body = <Spinner />;
  } else if (isError) {
    body = <Text>{t('deeplink.cant_load.text')}</Text>;
  } else {
    body = <DeepLinkInfo deeplink={deeplink} />;
  }

  return (
    <Container maxWidth="md" my="4">
      <Card
        header={
          <Text variant="h4">{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</Text>
        }
      >
        {body}
      </Card>
    </Container>
  );
};
