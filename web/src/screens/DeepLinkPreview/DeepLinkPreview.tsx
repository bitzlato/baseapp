import { FC } from 'react';
import { useParams } from 'react-router';
import { DeepLinkInfo, deeplinkTitle } from 'web/src/components';
import { Box } from 'web/src/components/ui/Box';
import { Card } from 'web/src/components/Card/Card';
import { Container } from 'web/src/components/Container/Container';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import { useDeepLinkInfo } from 'web/src/hooks/data/useDeepLinkInfo';

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
    <Container maxWidth="sm" my="4">
      <Card
        header={
          <Text variant="title">{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</Text>
        }
      >
        <Box display="flex" fontSize="medium">
          {body}
        </Box>
      </Card>
    </Container>
  );
};
