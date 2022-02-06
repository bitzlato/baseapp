import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'src/components';
import { isUsernameEnabled } from 'src/api';
import { CloseIcon } from 'src/assets/images/CloseIcon';
import {
  createInternalTransfersFetch,
  selectInternalTransfersCreateSuccess,
  selectUserInfo,
  selectWallets,
  walletsFetch,
} from 'src/modules';
import { AmountFormat } from 'src/components/AmountFormat/AmountFormat';
import { InternalTransferInput } from './InternalInput';
import { createMoney } from 'src/helpers/money';
import { SelectString } from '../Select/Select';

export const InternalTransferComponent = () => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  const history = useHistory();
  const wallets = useSelector(selectWallets);
  const user = useSelector(selectUserInfo);
  const transferSuccess = useSelector(selectInternalTransfersCreateSuccess);

  const [username, setUsername] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [otp, setOtp] = useState('');

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(walletsFetch());
  }, []);

  useEffect(() => {
    if (transferSuccess) {
      handleResetState();
    }
  }, [transferSuccess]);

  const walletsList = wallets.map((item) => item.currency.code);

  const wallet = wallets.find((item) => item.currency.code === currency);

  const amountMoney = wallet && amount !== '' ? createMoney(amount, wallet.currency) : undefined;
  const isError = wallet && wallet.balance && amountMoney && wallet.balance.lt(amountMoney);
  const balanceError = classnames(
    'cr-internal-transfer__group--balance',
    isError && 'cr-internal-transfer__group--error',
  );
  const translationUsername = isUsernameEnabled() ? 'username' : 'uid';

  const handleCreateTransfer = useCallback(() => {
    const payload = {
      currency: currency.toLowerCase(),
      username_or_uid: username,
      amount,
      otp,
    };

    dispatch(createInternalTransfersFetch(payload));
    setShow(false);
  }, [username, otp, amount, currency, dispatch]);

  const translate = useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

  const handleNavigateTo2fa = useCallback((enable2fa: boolean) => {
    history.push('/security/2fa', { enable2fa });
  }, []);

  const handleResetState = () => {
    setShow(false);
    setUsername('');
    setCurrency('');
    setAmount('');
    setOtp('');
  };

  const renderFooter = useMemo(() => {
    return (
      <Button block={true} type="button" onClick={handleCreateTransfer} size="lg" variant="primary">
        {translate('page.body.internal.transfer.continue')}
      </Button>
    );
  }, [username, otp, amount, currency, handleCreateTransfer, translate]);

  const renderHeader = useMemo(() => {
    return (
      <>
        <div className="cr-modal__container-header-text">
          {translate('page.body.internal.transfer.header')}
        </div>
        <CloseIcon className={'cr-modal__container-header-cancel'} onClick={() => setShow(false)} />
      </>
    );
  }, [translate, setShow]);

  const renderBody = useMemo(() => {
    return (
      <>
        <div className="cr-modal__container-content__transfer">
          {translate('page.body.internal.transfer.modal.content.transfer')}
          <span>
            {amountMoney && <AmountFormat money={amountMoney} />} {currency}
          </span>
          {translate('page.body.internal.transfer.modal.content.to')}
          <span>{username}</span>
          {translate('page.body.internal.transfer.modal.content.account')}
        </div>
        <div className="cr-modal__container-content--notice">
          {translate(`page.body.internal.transfer.notice.${translationUsername}`)}
        </div>
      </>
    );
  }, [translate, translationUsername, amount, currency, username]);

  return (
    <div className="cr-internal-transfer">
      <div className="cr-internal-transfer__header">
        {translate('page.body.internal.transfer.header')}
      </div>
      <div className="cr-internal-transfer__inputs">
        <InternalTransferInput
          field={translationUsername}
          handleChangeInput={setUsername}
          value={username}
        />
        <div className="cr-internal-transfer__group">
          <InternalTransferInput
            field="amount"
            handleChangeInput={setAmount}
            value={amount}
            fixed={wallet?.precision ?? 0}
          />
          <SelectString
            className="pg-confirm__content-address__row__content-number-dropdown"
            options={walletsList}
            onChange={(value) => setCurrency(value!)}
            placeholder="Currency"
          />
          <div
            onClick={() => setAmount(wallet && wallet.balance ? wallet.balance.toString() : '')}
            className={balanceError}
          >
            {translate('page.body.internal.transfer.account.balance')}
            {wallet && wallet.balance && currency !== '' ? (
              <AmountFormat money={wallet.balance} />
            ) : (
              0
            )}{' '}
            {currency}
            {wallet && wallet.balance && isError
              ? translate('page.body.internal.transfer.insufficient.balance')
              : null}
          </div>
        </div>
        <InternalTransferInput field="otp" handleChangeInput={setOtp} value={otp} />
      </div>
      <div className="cr-internal-transfer__inputs">
        <Button
          block={true}
          type="button"
          onClick={() => setShow(!show)}
          size="lg"
          variant="primary"
          disabled={(!username || !otp || !+amount || !currency || isError) as boolean}
        >
          {translate('page.body.internal.transfer.continue')}
        </Button>
      </div>
      <Modal show={show} header={renderHeader} content={renderBody} footer={renderFooter} />
      {!user.otp && (
        <div className="cr-internal-transfer--require-otp">
          {translate('page.body.internal.transfer.please.enable.2fa')}
          <div
            onClick={() => handleNavigateTo2fa(true)}
            className="cr-internal-transfer--require-otp-link"
          >
            {translate('page.body.internal.transfer.enable')}
          </div>
        </div>
      )}
    </div>
  );
};
