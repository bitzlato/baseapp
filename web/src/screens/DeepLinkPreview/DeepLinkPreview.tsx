import { FC } from 'react';
import { useParams } from 'react-router';
import { DeepLinkInfo, deeplinkTitle } from 'web/src/components';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
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
    <Modal size="lg" show persistent>
      <ModalHeader>{t(isLoading ? 'common.loading' : deeplinkTitle(deeplink))}</ModalHeader>
      <Box
        display="flex"
        fontSize="medium"
        mx="6x"
        py="4x"
        borderTopWidth="1x"
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        {body}
      </Box>
    </Modal>
  );
};
