import { FC, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mutate } from 'swr';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/Box';
import { defaultBeneficiary } from 'web/src/modules/user/beneficiaries/defaults';
import { useT } from 'web/src/hooks/useT';
import { Wallet } from 'web/src/modules';
import {
  selectWithdrawSuccess,
  walletsWithdrawCcyDataViewed,
  walletsWithdrawCcyFetch,
} from 'web/src/modules/user/wallets';
import { OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { ModalWithdrawConfirmation } from 'web/src/containers/Withdraw/ModalWithdrawConfirmation';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { WithdrawMarketFormValues } from 'web/src/containers/Withdraw/types';
import { WithdrawMarketForm } from 'web/src/containers/Withdraw/WithdrawMarketForm';
import { LIMIT } from 'web/src/containers/Wallets/History';
import { getHistoryEndpoint } from 'web/src/hooks/data/useFetchHistory';

interface Props {
  wallet: Wallet;
}

const defaultValue: WithdrawMarketFormValues = {
  amount: '',
  beneficiary: defaultBeneficiary,
  otpCode: '',
  total: '',
};

export const WithdrawMarket: FC<Props> = ({ wallet }) => {
  const t = useT();
  const dispatch = useDispatch();
  const { countdown, start } = useCountdown();

  const [withdrawData, setWithdrawData] = useState(defaultValue);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [withdrawSubmitModal, setWithdrawSubmitModal] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);

  const withdrawSuccess = useSelector(selectWithdrawSuccess);

  const withdrawalAddress = useMemo(
    () => (withdrawData.beneficiary.data ? (withdrawData.beneficiary.data.address as string) : ''),
    [withdrawData],
  );

  useEffect(() => {
    if (withdrawSuccess) {
      setWithdrawSubmitModal(true);
      setWithdrawDone(true);
      dispatch(walletsWithdrawCcyDataViewed());
    }
  }, [dispatch, withdrawSuccess]);

  const handleCloseWithdrawConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseWithdrawSubmitModal = () => {
    setWithdrawSubmitModal(false);

    mutate(
      getHistoryEndpoint({
        type: 'withdraws',
        params: {
          currency: wallet.currency.code.toLowerCase(),
          limit: LIMIT,
          page: 0,
        },
      }),
    );
  };

  const handleWithdraw = async () => {
    const withdrawRequest = {
      amount: withdrawData.amount,
      currency: wallet.currency.code.toLowerCase(),
      otp: withdrawData.otpCode,
      beneficiary_id: String(withdrawData.beneficiary.id),
      network_fee: withdrawData.networkFee,
    };

    dispatch(walletsWithdrawCcyFetch(withdrawRequest));

    setWithdrawData(defaultValue);
    setShowConfirmModal(false);
    start(OTP_TIMEOUT);
  };

  const handleSubmit = (data: WithdrawMarketFormValues) => {
    setWithdrawDone(false);
    setWithdrawData(data);
    setShowConfirmModal(true);
  };

  return (
    <>
      <WithdrawMarketForm
        wallet={wallet}
        countdown={countdown}
        withdrawDone={withdrawDone}
        onSubmit={handleSubmit}
      />

      {withdrawSubmitModal ? (
        <Modal2
          show
          header={t('page.modal.withdraw.success')}
          onClose={handleCloseWithdrawSubmitModal}
        >
          <Box as="span" textAlign="center">
            {t('page.modal.withdraw.success.message.content')}
          </Box>
          <Button onClick={handleCloseWithdrawSubmitModal} color="primary">
            {t('page.modal.withdraw.success.button')}
          </Button>
        </Modal2>
      ) : null}

      {showConfirmModal ? (
        <ModalWithdrawConfirmation
          show={showConfirmModal}
          amount={withdrawData.amount}
          total={withdrawData.total}
          currency={wallet.currency.code}
          precision={wallet.currency.minorUnit}
          rid={withdrawalAddress}
          onSubmit={handleWithdraw}
          onDismiss={handleCloseWithdrawConfirmModal}
        />
      ) : null}
    </>
  );
};
