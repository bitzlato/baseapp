import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { formatCCYAddress } from '../../helpers';
import { selectMobileDeviceState, Wallet, RootState, depositsCreateClear } from '../../modules';
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
     * @default 'Copy'
     *  Renders text of the label of copy button component
     */
    copyButtonText?: string;
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

    isMobileDevice: boolean;
}

interface DispatchProps {
    clearDepositIntention: typeof depositsCreateClear;
}

interface ReduxProps {
    isMobileDevice: boolean;
}

interface State {
    isOpenDepositModal: boolean;
}

type Props = DepositCryptoProps & DispatchProps;

/**
 *  Component that displays wallet details that can be used to deposit cryptocurrency.
 */
class DepositCryptoComponent extends React.Component<Props, State> {
// const DepositCrypto: React.FunctionComponent<DepositCryptoProps> = (props: DepositCryptoProps, state: State) => {
  constructor(props: Props) {
      super(props);
      this.state = {
          isOpenDepositModal: false,
      };
  }
  private handleOpenDepositModal = () => {
      this.props.clearDepositIntention();
      this.setState(prevState => ({
          isOpenDepositModal: !prevState.isOpenDepositModal,
      }));
  };


  public render() {
    const QR_SIZE = 118;
    const {
        buttonLabel,
        copiableTextFieldText,
        copyButtonText,
        dimensions,
        error,
        handleGenerateAddress,
        handleOnCopy,
        text,
        wallet,
        isMobileDevice
    } = this.props;
    const size = dimensions || QR_SIZE;
    const disabled = !wallet.deposit_address?.address;
    const onCopy = !disabled ? handleOnCopy : undefined;
    const className = classnames('cr-deposit-crypto', {'cr-copyable-text-field__disabled': disabled});
    const {
      isOpenDepositModal
    } = this.state;

    if (!wallet.deposit_address) {
      if (wallet.enable_intention) {
        return (
            <div className="pg-beneficiaries">
              {isOpenDepositModal && (
                  <DepositModal
                      currency={wallet.currency}
                      handleSubmit={() => {}}
                      handleCloseModal={this.handleOpenDepositModal}
                  />
              )}
                <div className="cr-deposit-crypto__create">
                    <div className="cr-deposit-crypto__create-btn">
                        <Button
                            block={true}
                            type="button"
                            onClick={this.handleOpenDepositModal}
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
                            copyButtonText={copyButtonText}
                            disabled={disabled}
                            label={copiableTextFieldText ? copiableTextFieldText : 'Deposit by Wallet Address'}
                        />
                    </fieldset>
                </form>
            </div>
        </div>
    );
  }
};

const mapStateToProps = (state: RootState): ReduxProps => ({
    isMobileDevice: selectMobileDeviceState(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    clearDepositIntention: () => dispatch(depositsCreateClear()),
});

// tslint:disable-next-line:no-any
export const DepositCrypto = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(DepositCryptoComponent) as any; // tslint:disable-line
