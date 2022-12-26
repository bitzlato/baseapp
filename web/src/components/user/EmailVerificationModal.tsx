import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';
import { UserAdsAlert } from 'web/src/components/shared/UserAds/UserAdsAlert';
import { EmailVerificationForm } from 'web/src/components/user/EmailVerificationForm';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';

export const EmailVerificationModal: FC = () => {
  const [show, setShow] = useState(true);
  const t = useT();
  const isMobileDevice = useIsMobileDevice();

  if (!show) {
    const handleClick = () => {
      setShow(true);
    };

    return (
      <Box px="5x" py="1x">
        <UserAdsAlert theme="warning">
          {t('Confirm your email')}!{' '}
          <Box
            as="button"
            type="button"
            fontWeight="strong"
            color={{ default: 'advertsAlertInfoLink', hover: 'advertsAlertInfoLinkHover' }}
            textDecoration="underline"
            onClick={handleClick}
          >
            {t('Confirm')}
          </Box>
        </UserAdsAlert>
      </Box>
    );
  }

  const handleConfirm = () => {
    setShow(false);
  };

  return (
    <Modal show size="lg" onClose={() => setShow(false)}>
      <ModalHeader center={!isMobileDevice}>{t('Confirm your email')}</ModalHeader>
      <EmailVerificationForm onConfirm={handleConfirm} />
    </Modal>
  );
};
