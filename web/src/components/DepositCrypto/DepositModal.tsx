import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    depositsCreate,
    selectDepositsCreateLoading,
    selectDepositsCreateSuccess,
    selectMobileDeviceState,
} from '../../modules';
import { CustomInput } from '../CustomInput';
import { MinAmountWarning } from './MinAmountWarning';

interface Props {
    currency: string;
    handleCloseModal: () => void;
    minDepositAmount: string;
}

const DepositModalComponent: React.FC<Props> = (props: Props) => {
    const [amount, setAmount] = React.useState('');
    const [isSubmitted, setSubmitted] = React.useState(false);
    const [amountValid, setAmountValid] = React.useState(false);
    const { handleCloseModal, currency } = props;
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const isMobileDevice = useSelector(selectMobileDeviceState);

    const isDepositCreateLoading = useSelector(selectDepositsCreateLoading);
    const isDepositCreateSuccess = useSelector(selectDepositsCreateSuccess);

    const handleClearModalsInputs = React.useCallback(() => {
        setAmount('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAmount]);

    const handleClickCloseModal = React.useCallback(() => {
        handleCloseModal();
        handleClearModalsInputs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleCloseModal]);

    React.useEffect(() => {
      if (isDepositCreateSuccess) {
        handleClickCloseModal();
      }
    });

    const renderModalHeader = React.useMemo(() => {
        return (
            <div className="cr-email-form__options-group">
                <div className="cr-email-form__option">
                    <div className="cr-email-form__option-inner">
                        {formatMessage({ id: 'page.body.wallets.deposits.addDepositModal.header' })}
                        <span
                            className="pg-profile-page__close pg-profile-page__pull-right"
                            onClick={handleClickCloseModal}
                        />
                    </div>
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatMessage]);

    const handleSubmit = React.useCallback(() => {
      setSubmitted(true);
        const payload = {
            currency: currency,
            amount: amount,
        };

         dispatch(depositsCreate(payload));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, currency, handleCloseModal, handleClearModalsInputs]);

    const getState = React.useCallback(key => {
        switch (key) {
            case 'amount':
                return amount;
            default:
                return '';
        }
    }, [
        amount,
    ]);

    const validateAmount = React.useCallback((value: string) => {
      const num = parseFloat(value);
       setAmountValid(num > parseFloat(props.minDepositAmount));
    }, []);

    const handleChangeFieldValue = React.useCallback((key: string, value: string) => {
      setAmount(value);
      validateAmount(value);
    }, [validateAmount]);
    const isDisabled = isSubmitted || !amount || !amountValid || isDepositCreateLoading || isDepositCreateSuccess;

    const renderField = React.useCallback((field: string) => {
        const focusedClass = classnames('cr-email-form__group', {
            'cr-email-form__group--focused': true,
            'cr-email-form__group--optional': false,
        });

        return (
            <div key={field} className={focusedClass}>
                <CustomInput
                    type="number"
                    label={formatMessage({ id: 'page.body.wallets.deposits.addDepositModal.amount' })}
                    placeholder={formatMessage({ id: 'page.body.wallets.deposits.addDepositModal.amount' })}
                    defaultLabel={field}
                    handleChangeInput={value => handleChangeFieldValue(field, value)}
                    // @ts-ignore
                    inputValue={getState(field)}
                    isDisabled={isSubmitted}
                    classNameLabel="cr-email-form__label"
                    classNameInput="cr-email-form__input"
                    autoFocus={true}
                />
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatMessage, getState, isSubmitted]);

    const renderBody = React.useMemo(() => {
        return (
            <div className="cr-email-form__form-content">
                {renderField('amount')}
                <MinAmountWarning currency={currency} minDepositAmount={props.minDepositAmount} />
                <div className="cr-email-form__button-wrapper">
                    <Button
                        disabled={isDisabled}
                        onClick={handleSubmit}
                        size="lg"
                        variant="primary"
                    >
                        {formatMessage({ id: 'page.body.wallets.deposits.addDepositModal.body.button' })}
                    </Button>
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, isDisabled, isSubmitted]);

    const renderContent = React.useCallback(() => {
        const addModalClass = classnames({'cr-modal': !isMobileDevice});

        return (
            <div className={addModalClass}>
                <div className="cr-email-form">
                    {renderModalHeader}
                    {renderBody}
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobileDevice, getState, isDisabled, isSubmitted]);

    return renderContent();
};

const DepositModal = React.memo(DepositModalComponent);

export {
    DepositModal,
};
