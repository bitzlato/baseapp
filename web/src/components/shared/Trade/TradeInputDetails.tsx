import { FC } from 'react';
import { useTradeAction, useTradeContext } from 'web/src/components/shared/Trade/TradeContext';
import { TradeDetailsModal } from 'web/src/components/shared/Modal/TradeDetailsModal';

export const TradeInputDetails: FC = () => {
  const { toggleModal, modals, handleTradeDetails, trade } = useTradeContext();

  const detailsModal = modals.details;
  const tradeAction = useTradeAction();

  const toggleDetailsModal = () => {
    toggleModal('details');
  };

  const handleConfirm = (value: string) => {
    handleTradeDetails(value, () => tradeAction('confirm-trade'));
  };

  return detailsModal ? (
    <TradeDetailsModal
      confirm={handleConfirm}
      onClose={toggleDetailsModal}
      paymethodId={trade.paymethod.id}
    />
  ) : null;
};
