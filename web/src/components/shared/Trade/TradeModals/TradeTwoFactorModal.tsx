import { FC } from 'react';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { useSharedT } from 'web/src/components/shared/Adapter';

export const TradeTwoFactorModal: FC = () => {
  const { modals, toggleModal, handleTradeAction } = useTradeContext();
  const { ask2fa } = modals;
  const t = useSharedT();

  const handleClose = () => {
    toggleModal('ask2fa');
  };

  const handleSend = (code: string) => {
    handleTradeAction('confirm-payment', code);
    toggleModal('ask2fa');
  };

  return (
    <TwoFactorModal
      show={ask2fa}
      onClose={handleClose}
      onSend={handleSend}
      buttonText={t('trade.state.button.confirm_payment')}
    />
  );
};
