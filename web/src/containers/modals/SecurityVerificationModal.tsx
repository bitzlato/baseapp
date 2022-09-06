import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { toggleNeedVerification } from 'web/src/modules/user/profile/actions';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { selectMobileDeviceState } from 'web/src/modules';
import { kyc } from './SecurityVerificationModal.css';

export const SecurityVerificationModal: FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const close = () => {
    dispatch(toggleNeedVerification({ needVerification: false }));
  };

  const cancel = (
    <Button variant="outlined" color="secondary" fullWidth onClick={close}>
      {t('Cancel')}
    </Button>
  );

  const gotoVerification = (
    <Button
      as="a"
      data-gtm-click="get_verified"
      target="_blank"
      rel="noopener noreferrer"
      href={user.kyc_verification_url}
      color="secondary"
      fullWidth
      onClick={close}
    >
      <Text whiteSpace="nowrap">{t('Go to verification')}</Text>
    </Button>
  );

  return (
    <Modal show onClose={close}>
      <ModalHeader center={!isMobileDevice}>{t('Security verification')}</ModalHeader>
      <ModalBody>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box p="6x" className={kyc} borderRadius="1.5x">
            <Text fontWeight="strong" textAlign="center">
              {t('verification.kyc')}
            </Text>
          </Box>
          <Box py="6x">
            <Text textAlign="center">{t('verification.info')}</Text>
          </Box>
        </Box>
      </ModalBody>
      <ModalFooter>
        {isMobileDevice ? (
          <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
            {gotoVerification}
            {cancel}
          </Box>
        ) : (
          <Box flexGrow={1} display="flex" gap="4x">
            {cancel}
            {gotoVerification}
          </Box>
        )}
      </ModalFooter>
    </Modal>
  );
};
