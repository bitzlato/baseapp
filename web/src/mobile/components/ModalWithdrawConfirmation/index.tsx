import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { CurrencyTicker } from 'src/components/CurrencyTicker/CurrencyTicker';
import { createMoneyWithoutCcy } from 'src/helpers/money';
import { MobileModal } from '..';

interface ModalWithdrawConfirmationProps {
  amount: string;
  currency: string;
  onSubmit: () => void;
  onDismiss: () => void;
  rid: string;
  show: boolean;
  precision: number;
}

const ModalWithdraw = (props: ModalWithdrawConfirmationProps) => {
  const { formatMessage } = useIntl();
  const { amount, currency, precision, rid, onDismiss, onSubmit } = props;

  const renderHeader = React.useCallback(() => {
    return (
      <div className="pg-exchange-modal-submit-header">
        {formatMessage({ id: 'page.mobile.wallet.withdraw.modal.confirmation' })}
      </div>
    );
  }, [formatMessage]);

  return (
    <MobileModal title={renderHeader()} onClose={onDismiss} isOpen={props.show}>
      <div className="pg-exchange-modal-submit-body mobile-modal-body__withdraw-confirm">
        <div className="mobile-modal-body__withdraw-confirm--block">
          <span className="mobile-modal-body__withdraw-confirm--light">
            {formatMessage({ id: 'page.mobile.wallet.withdraw.modal.confirmation.warning' })}
          </span>
        </div>
        <div className="mobile-modal-body__withdraw-confirm--block">
          <span className="mobile-modal-body__withdraw-confirm--mute">
            {formatMessage({ id: 'page.mobile.wallet.withdraw.modal.confirmation.message1' })}
          </span>
          <span className="mobile-modal-body__withdraw-confirm--light">
            {createMoneyWithoutCcy(amount, precision).toFormat()}{' '}
            <CurrencyTicker symbol={currency} />
          </span>
        </div>
        <div className="mobile-modal-body__withdraw-confirm--block">
          <span className="mobile-modal-body__withdraw-confirm--mute">
            {formatMessage({ id: 'page.mobile.wallet.withdraw.modal.confirmation.message2' })}
          </span>
          <span className="mobile-modal-body__withdraw-confirm--light">{rid}</span>
        </div>
      </div>
      <div className="pg-exchange-modal-submit-footer modal-footer__withdraw-confirm">
        <Button
          block
          className="btn-block mr-1 mt-1 btn-lg"
          onClick={onDismiss}
          size="lg"
          variant="danger"
        >
          {formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.button.cancel' })}
        </Button>
        <Button
          block
          className="btn-block mr-1 mt-1 btn-lg"
          onClick={onSubmit}
          size="lg"
          variant="primary"
        >
          {formatMessage({ id: 'page.body.wallets.tabs.withdraw.modal.button.withdraw' })}
        </Button>
      </div>
    </MobileModal>
  );
};

export const ModalWithdrawConfirmationMobile = React.memo(ModalWithdraw);
