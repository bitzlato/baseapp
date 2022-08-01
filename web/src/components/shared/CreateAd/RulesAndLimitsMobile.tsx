import { useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody } from 'web/src/components/ui/Modal';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import InfoIcon from 'web/src/assets/svg/InfoIcon.svg';
import { Rules } from './Rules';
import { Limits } from './Limits';

export const RulesAndLimitsMobile = () => {
  const { t } = useAdapterContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="text" color="secondary" size="small" onClick={handleClick}>
        <InfoIcon />
        <Box ml="2x">{t('createAd.rules')}</Box>
      </Button>

      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalBody>
          <Box display="flex" flexDirection="column" pt="6x" pb="4x" gap="4x">
            <Box pr="5x">
              <Text variant="title">{t('createAd.rules')}</Text>
            </Box>
            <Rules />
          </Box>

          <Box display="flex" flexDirection="column" pt="4x" pb="4x" gap="4x">
            <Text variant="title">{t('createAd.limits')}</Text>
            <Limits />
          </Box>
        </ModalBody>
      </Modal>
    </>
  );
};
