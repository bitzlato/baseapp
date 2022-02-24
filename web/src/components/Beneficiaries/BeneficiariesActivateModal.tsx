import * as React from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { formatSeconds } from 'web/src/helpers/formatSeconds';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { LetterIcon } from '../../assets/images/LetterIcon';
import { MobileModal } from '../../mobile/components/Modal';
import {
  beneficiariesActivate,
  beneficiariesResendPin,
  Beneficiary,
  selectMobileDeviceState,
} from '../../modules';
import { Box } from '../Box/Box';
import { TextInput } from '../Input/TextInput';
import { isValidCode, PIN_TIMEOUT } from 'web/src/helpers/codeValidation';

interface Props {
  beneficiariesAddData: Beneficiary;
  handleToggleConfirmationModal: () => void;
}

const BeneficiariesActivateModalComponent: React.FC<Props> = (props: Props) => {
  const [confirmationModalCode, setConfirmationModalCode] = React.useState('');

  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const isMobileDevice = useSelector(selectMobileDeviceState);

  const { start, countdown } = useCountdown();

  const { handleToggleConfirmationModal, beneficiariesAddData } = props;

  const handleChangeFieldValue = React.useCallback((value: string) => {
    setConfirmationModalCode(value);
  }, []);

  const handleClearModalsInputs = React.useCallback(() => {
    setConfirmationModalCode('');
  }, []);

  const handleClickToggleConfirmationModal = React.useCallback(
    (clear?: boolean) => () => {
      handleToggleConfirmationModal();

      if (clear) {
        handleClearModalsInputs();
      }
    },
    [handleToggleConfirmationModal, handleClearModalsInputs],
  );

  const handleSubmitConfirmationModal = React.useCallback(() => {
    if (beneficiariesAddData) {
      start(PIN_TIMEOUT);
      dispatch(
        beneficiariesActivate({
          pin: confirmationModalCode,
          id: beneficiariesAddData.id,
        }),
      );
    }
  }, [confirmationModalCode, dispatch, beneficiariesAddData, handleClearModalsInputs]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isValidCode(confirmationModalCode) && countdown < 1) {
      event.preventDefault();
      handleSubmitConfirmationModal();
    }
  };

  const handleResendConfirmationCode = React.useCallback(() => {
    if (beneficiariesAddData) {
      dispatch(
        beneficiariesResendPin({
          id: beneficiariesAddData.id,
        }),
      );
    }
  }, [beneficiariesAddData, dispatch]);

  const renderConfirmationModalBody = React.useCallback(() => {
    const isDisabled = !isValidCode(confirmationModalCode) || countdown > 0;

    return (
      <div className="cr-email-form__form-content">
        <div className="confirmation-modal__content">
          <LetterIcon className="confirmation-modal__content__icon" />
          <span className="confirmation-modal__content__text">
            {formatMessage({ id: 'page.body.wallets.beneficiaries.confirmationModal.body.text' })}
          </span>
        </div>
        <Box col spacing="2">
          <TextInput
            label={formatMessage({
              id: 'page.body.wallets.beneficiaries.confirmationModal.body.confirmationModalCode',
            })}
            labelVisible
            value={confirmationModalCode}
            onChange={handleChangeFieldValue}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <div className="cr-email-form__button-wrapper cr-email-form__button-wrapper--double">
            <Button onClick={handleResendConfirmationCode} size="lg" variant="secondary">
              {formatMessage({
                id: 'page.body.wallets.beneficiaries.confirmationModal.body.resendButton',
              })}
            </Button>
            <Button
              disabled={isDisabled}
              onClick={handleSubmitConfirmationModal}
              size="lg"
              variant="primary"
            >
              {countdown
                ? formatSeconds(countdown)
                : formatMessage({
                    id: 'page.body.wallets.beneficiaries.confirmationModal.body.button',
                  })}
            </Button>
          </div>
        </Box>
      </div>
    );
  }, [
    confirmationModalCode,
    countdown,
    formatMessage,
    handleResendConfirmationCode,
    handleSubmitConfirmationModal,
  ]);

  const renderConfirmationModalHeader = React.useCallback(() => {
    return (
      <div className="cr-email-form__options-group">
        <div className="cr-email-form__option">
          <div className="cr-email-form__option-inner">
            {formatMessage({ id: 'page.body.wallets.beneficiaries.confirmationModal.header' })}
            <span
              className="pg-profile-page__close pg-profile-page__pull-right"
              onClick={handleClickToggleConfirmationModal(true)}
            />
          </div>
        </div>
      </div>
    );
  }, [handleClickToggleConfirmationModal, formatMessage]);

  const renderContent = React.useCallback(() => {
    const className = cn('beneficiaries-confirmation-modal', {
      'cr-modal': !isMobileDevice,
    });

    return (
      <div className={className}>
        <div className="cr-email-form">
          {renderConfirmationModalHeader()}
          {renderConfirmationModalBody()}
        </div>
      </div>
    );
  }, [isMobileDevice, renderConfirmationModalBody, renderConfirmationModalHeader]);

  return isMobileDevice ? (
    <MobileModal
      onClose={props.handleToggleConfirmationModal}
      title={formatMessage({ id: 'page.mobile.wallet.withdraw.modal.new.account' })}
      isOpen
    >
      {renderContent()}
    </MobileModal>
  ) : (
    renderContent()
  );
};

const BeneficiariesActivateModal = React.memo(BeneficiariesActivateModalComponent);

export { BeneficiariesActivateModal };
