import { FC, useState, useCallback, KeyboardEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'web/src/hooks/useT';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { LetterIcon } from 'web/src/assets/images/LetterIcon';
import {
  beneficiariesActivate,
  beneficiariesResendPin,
  Beneficiary,
  selectMobileDeviceState,
} from 'web/src/modules';
import { TextInput } from 'web/src/components/Input/TextInput';
import { isValidCode, PIN_TIMEOUT } from 'web/src/helpers/codeValidation';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalHeader } from 'web/src/components/ui/Modal';

interface Props {
  show: boolean;
  beneficiariesAddData: Beneficiary;
  handleToggleConfirmationModal: () => void;
}

const BeneficiariesActivateModalComponent: FC<Props> = ({
  show,
  handleToggleConfirmationModal,
  beneficiariesAddData,
}: Props) => {
  const [code, setCode] = useState('');

  const t = useT();
  const dispatch = useDispatch();

  const isMobileDevice = useSelector(selectMobileDeviceState);

  const { start, countdown } = useCountdown();

  const handleChangeFieldValue = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleClearModalsInputs = useCallback(() => {
    setCode('');
  }, []);

  const handleClickToggleConfirmationModal = useCallback(
    (clear?: boolean) => () => {
      handleToggleConfirmationModal();

      if (clear) {
        handleClearModalsInputs();
      }
    },
    [handleToggleConfirmationModal, handleClearModalsInputs],
  );

  const handleSubmitConfirmationModal = useCallback(() => {
    if (beneficiariesAddData) {
      start(PIN_TIMEOUT);
      dispatch(
        beneficiariesActivate({
          pin: code,
          id: beneficiariesAddData.id,
        }),
      );
      setCode('');
    }
  }, [start, code, dispatch, beneficiariesAddData]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isValidCode(code) && countdown < 1) {
      event.preventDefault();
      handleSubmitConfirmationModal();
    }
  };

  const handleResendConfirmationCode = useCallback(() => {
    if (beneficiariesAddData) {
      dispatch(
        beneficiariesResendPin({
          id: beneficiariesAddData.id,
        }),
      );
    }
  }, [beneficiariesAddData, dispatch]);

  const isDisabled = !isValidCode(code) || countdown > 0;

  return (
    <Modal size="lg" show={show} onClose={handleClickToggleConfirmationModal(true)}>
      <ModalHeader>{t('page.body.wallets.beneficiaries.confirmationModal.header')}</ModalHeader>
      <Box
        fontSize="medium"
        mx="6x"
        py="4x"
        borderTopWidth="1x"
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        <Box display="flex" flexDirection="row">
          {isMobileDevice ? null : (
            <Box mr="4x" flexShrink={0}>
              <LetterIcon />
            </Box>
          )}
          <Text color={isMobileDevice ? 'text' : 'secondary'}>
            {t('page.body.wallets.beneficiaries.confirmationModal.body.text')}
          </Text>
        </Box>
        <Box display="block" mt="6x">
          <TextInput
            label={t(
              'page.body.wallets.beneficiaries.confirmationModal.body.confirmationModalCode',
            )}
            autoFocus
            labelVisible
            value={code}
            onChange={handleChangeFieldValue}
            onKeyPress={handleKeyPress}
          />
          <Box display="flex" alignItems="center" mt="4x">
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={handleResendConfirmationCode}
            >
              {t('page.body.wallets.beneficiaries.confirmationModal.body.resendButton')}
            </Button>
            <Box w="4x" flexShrink={0} />
            <Button
              color="primary"
              fullWidth
              disabled={isDisabled}
              onClick={handleSubmitConfirmationModal}
            >
              {countdown
                ? formatSeconds(countdown)
                : t('page.body.wallets.beneficiaries.confirmationModal.body.button')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const BeneficiariesActivateModal = memo(BeneficiariesActivateModalComponent);

export { BeneficiariesActivateModal };
