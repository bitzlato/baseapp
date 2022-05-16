import { FC } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import DoneIcon from 'web/src/assets/svg/DoneIcon.svg';
import WarningTriangleIcon from 'web/src/assets/svg/WarningTriangleIcon.svg';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';

export const SignedOpsModal: FC<{
  message: JSX.Element;
  actionBlock: JSX.Element;
  isSuccess: boolean;
  handleClose: () => void;
}> = ({ message, actionBlock, isSuccess, handleClose }) => {
  const t = useT();

  return (
    <Modal show onClose={handleClose}>
      <ModalHeader />
      <ModalBody>
        <Box textAlign="center" marginLeft="auto" marginRight="auto">
          {isSuccess ? <DoneIcon /> : <WarningTriangleIcon />}
        </Box>
        {!isSuccess && (
          <Box textAlign="center">
            <Box as="span" textAlign="center" fontWeight="strong">
              {t('signed.error.title')}
            </Box>
          </Box>
        )}
        <Box
          textAlign="center"
          marginTop="2x"
          marginBottom="2x"
          fontWeight={isSuccess ? 'strong' : 'regular'}
        >
          {message}
        </Box>
      </ModalBody>
      <ModalFooter>{actionBlock}</ModalFooter>
    </Modal>
  );
};
