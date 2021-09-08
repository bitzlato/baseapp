import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { formatCCYAddress } from '../../helpers';
import { depositsCreateClear, selectMobileDeviceState, Wallet } from '../../modules';
import { CopyableTextField } from '../CopyableTextField';
import { MetaMaskButton } from '../MetaMaskButton';
import { QRCode } from '../QRCode';
import { DepositModal } from './DepositModal';

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
     *  Renders text of a component
     */
    text?: string;
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
    /**
     * Generate address button label
     */
    buttonLabel?: string;
    disabled?: boolean;
}


/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
const DepositCrypto: React.FunctionComponent<DepositCryptoProps> = (props: DepositCryptoProps) => {
    const QR_SIZE = 118;
    const {
        buttonLabel,
        copiableTextFieldText,
        dimensions,
        error,
        handleGenerateAddress,
        handleOnCopy,
        text,
        wallet
    } = props;
    const isMobileDevice = useSelector(selectMobileDeviceState);
    const size = dimensions || QR_SIZE;
    const disabled = !wallet.deposit_address?.address;
    const onCopy = !disabled ? handleOnCopy : undefined;
    const className = classnames('cr-deposit-crypto', {'cr-copyable-text-field__disabled': disabled});

    const dispatch = useDispatch();
    const [isOpenDepositModal, setOpenDepositModal] = React.useState(false);

    const handleOpenDepositModal = () => {
        dispatch(depositsCreateClear());
        setOpenDepositModal(!isOpenDepositModal);
    };

    if (!wallet.deposit_address) {
        if (wallet.enable_invoice) {
            return (
                <div className="pg-beneficiaries">
                  {isOpenDepositModal && (
                      <DepositModal
                          currency={wallet.currency}
                          handleCloseModal={handleOpenDepositModal}
                      />
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
                                {'Create Deposit'}
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={className}>
                    <div className="cr-deposit-crypto__create">
                        <div className="cr-deposit-crypto__create-btn">
                            <Button
                                block={true}
                                type="button"
                                onClick={handleGenerateAddress}
                                size="lg"
                                variant="primary"
                            >
                                {buttonLabel ? buttonLabel : 'Generate deposit address'}
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const walletAddress = wallet.deposit_address && wallet.deposit_address.address ?
        formatCCYAddress(wallet.currency, wallet.deposit_address.address) : '';

    return (
        <div className={className}>
            <div>
                <p className="cr-deposit-info">{text}</p>
                {walletAddress ? (
                    <div className="d-none d-md-block qr-code-wrapper">
                        <QRCode dimensions={size} data={walletAddress}/>
                    </div>
                ) : null}
            </div>
            <div className="cr-deposit-crypto__block">
                {wallet.currency === 'eth' && !isMobileDevice && walletAddress ? (
                    <MetaMaskButton depositAddress={walletAddress} />
                ) : null}
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
            </div>
        </div>
    );
};

export {
    DepositCrypto,
};
