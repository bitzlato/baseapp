import cn from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { formatCCYAddress } from '../../helpers';
import { Currency, depositsCreateClear, selectMobileDeviceState, Wallet } from '../../modules';
import { Box, boxStyle } from '../Box';
import { CopyableTextField } from '../CopyableTextField';
import { MetaMaskButton } from '../MetaMaskButton';
import { QRCode } from '../QRCode';
import { DepositModal } from './DepositModal';
import { DepositSummary } from './DepositSummary';

export interface DepositCryptoProps {
  /**
   * Wallet
   */
  wallet: Wallet;
  /**
   * Data which is used to display error if data is undefined
   */
  error: string;
  /**
   * Defines the size of QR code component.
   * @default 118
   */
  dimensions?: number;
  /**
   * @default 'Deposit by Wallet Address'
   * Renders text of the label of CopyableTextField component
   */
  copiableTextFieldText?: string;
  /**
   * Renders text alert about success copy address
   */
  handleOnCopy: () => void;
  /**
   * Generate wallet address for selected wallet
   */
  handleGenerateAddress: () => void;
  disabled?: boolean;
  currency: Currency;
}

/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
export const DepositCrypto: React.FC<DepositCryptoProps> = (props) => {
  const QR_SIZE = 118;
  const {
    copiableTextFieldText,
    dimensions,
    error,
    handleGenerateAddress,
    handleOnCopy,
    wallet,
    currency,
  } = props;
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const size = dimensions || QR_SIZE;
  const disabled = !wallet.deposit_address?.address;
  const onCopy = !disabled ? handleOnCopy : undefined;
  const className = cn('cr-deposit-crypto', disabled && 'cr-copyable-text-field__disabled');

  const dispatch = useDispatch();
  const [isOpenDepositModal, setOpenDepositModal] = React.useState(false);
  const t = useT();

  const handleOpenDepositModal = () => {
    dispatch(depositsCreateClear());
    setOpenDepositModal(!isOpenDepositModal);
  };

  if (!wallet.deposit_address) {
    if (wallet.enable_invoice) {
      return (
        <div className="pg-beneficiaries">
          {isOpenDepositModal && (
            <DepositModal currency={currency} handleCloseModal={handleOpenDepositModal} />
          )}
          <div className="cr-deposit-crypto__create">
            <div className="cr-deposit-crypto__create-btn">
              <Button
                block={true}
                type="button"
                onClick={handleOpenDepositModal}
                size="lg"
                variant="primary"
              >
                {t('page.body.wallets.tabs.deposit.ccy.button.create')}
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      const buttonLabel = t('page.body.wallets.tabs.deposit.ccy.button.generate', {
        currency: wallet.name,
      });
      return (
        <Box col spacing="3x" className={className}>
          <div className="cr-deposit-crypto__create">
            <div className="cr-deposit-crypto__create-btn">
              <Button
                block={true}
                type="button"
                onClick={handleGenerateAddress}
                size="lg"
                variant="primary"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Box>
      );
    }
  }

  const walletAddress =
    wallet.deposit_address && wallet.deposit_address.address
      ? formatCCYAddress(wallet.currency, wallet.deposit_address.address)
      : '';

  const text = t('page.body.wallets.tabs.deposit.ccy.message.submit', {
    confirmations: currency.min_confirmations,
  });

  return (
    <Box col spacing="3x" className={className}>
      <Box row>
        <div className="cr-deposit-info">{text}</div>
        {walletAddress && (
          <div className="d-none d-md-block qr-code-wrapper">
            <QRCode dimensions={size} data={walletAddress} />
          </div>
        )}
      </Box>
      <Box row spacing="2x">
        {wallet.currency === 'eth' && !isMobileDevice && walletAddress && (
          <MetaMaskButton depositAddress={walletAddress} />
        )}
        <form className="cr-deposit-crypto__copyable">
          <fieldset className="cr-copyable-text-field" onClick={onCopy}>
            <CopyableTextField
              className="cr-deposit-crypto__copyable-area"
              value={walletAddress || error}
              fieldId={walletAddress ? 'copy_deposit_1' : 'copy_deposit_2'}
              disabled={disabled}
              label={copiableTextFieldText ? copiableTextFieldText : 'Deposit by Wallet Address'}
            />
          </fieldset>
        </form>
      </Box>
      <DepositSummary currency={currency} />
    </Box>
  );
};
