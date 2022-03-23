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

  return (
    <Container maxWidth="md" my="4">
      <Card
        header={
          <Text variant="h4">{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</Text>
        }
      >
        {isLoading && <Spinner />}
        {(!isLoading && (isError || !deeplink))
          ? <Text>{t('deeplink.cant_load.text')}</Text>
          : <DeepLinkInfo deeplink={deeplink} />
        }
      </Card>
    </Container>
  );
};
