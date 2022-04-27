import { FC, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'web/src/modules';
import { defaultBeneficiary } from 'web/src/modules/user/beneficiaries/defaults';
import { Beneficiary } from 'web/src/modules/user/beneficiaries';
import {
  selectWithdrawSuccess,
  Wallet,
  walletsWithdrawCcyFetch,
} from 'web/src/modules/user/wallets';
import { WithdrawMarket } from 'web/src/containers/Withdraw/WithdrawMarket';
import { WithdrawP2P } from 'web/src/containers/Withdraw/WithdrawP2P';
import { ModalWithdrawConfirmation } from 'web/src/containers/Withdraw/ModalWithdrawConfirmation';
import { useCountdown } from 'web/src/hooks/useCountdown';
import { OTP_TIMEOUT } from 'web/src/helpers/codeValidation';
import { Modal2 } from 'web/src/components/Modal/Modal2';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/Box/Box';
import { useP2PWithdrawal } from 'web/src/hooks/mutations/useP2PWithdrawal';
import { SelectString } from 'web/src/components/Select/Select';
import { P2PWithdrawalParams } from 'web/src/modules/p2p/withdrawal';
import { WalletHistory } from 'web/src/containers/Wallets/History';
import { WalletItemData } from 'web/src/components/WalletItem/WalletItem';
import { WalletType } from 'web/src/modules/account/types';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';

const WALLET_TYPES: WalletType[] = ['p2p', 'market'];

interface Props {
  general: WalletItemData;
  wallet: Wallet | undefined;
}

export const Withdraw: FC<Props> = ({ general, wallet }) => {
  const t = useT();
  const dispatch = useDispatch();

  const [withdrawSubmitModal, setWithdrawSubmitModal] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    address: '',
    beneficiary: defaultBeneficiary,
    otpCode: '',
    useVoucher: false,
    withdrawConfirmModal: false,
    total: '',
    withdrawDone: false,
  });

  const withdrawSuccess = useSelector(selectWithdrawSuccess);
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const [p2pWithdrawalMutate] = useP2PWithdrawal();

  const { countdown, start } = useCountdown();

  const currency = general.balanceTotal.currency;
  const isBTC = currency.code === 'BTC';
  const hasP2P = general.balanceP2P !== undefined;
  const hasMarket = !isBTC && wallet !== undefined;

  const availableWalletTypes = useMemo(() => {
    return WALLET_TYPES.filter((type) => {
      switch (type) {
        case 'p2p':
          return hasP2P;
        case 'market':
          return hasMarket;
      }
    });
  }, [hasP2P, hasMarket]);

  const [walletType, setWalletType] = useStateWithDeps<WalletType | null>(
    () => (availableWalletTypes.length === 1 ? availableWalletTypes[0]! : null),
    [availableWalletTypes],
  );
  const isP2P = walletType === 'p2p';
  const isMarket = walletType === 'market';

  useEffect(() => {
    if (withdrawSuccess) {
      toggleSubmitModal();
    }
  }, [withdrawSuccess]);

  const withdrawalAddress = useMemo(() => {
    if (isP2P) {
      return withdrawData.address;
    }

    return withdrawData.beneficiary.data ? (withdrawData.beneficiary.data.address as string) : '';
  }, [withdrawData]);

  const toggleConfirmModal = (
    data: {
      amount?: string;
      total?: string;
      address?: string;
      beneficiary?: Beneficiary;
      otpCode?: string;
      useVoucher?: boolean;
    } = {},
  ) => {
    setWithdrawData((state: any) => ({
      amount: data.amount || '',
      address: data.address || '',
      beneficiary: data.beneficiary || defaultBeneficiary,
      otpCode: data.otpCode || '',
      useVoucher: data.useVoucher || false,
      withdrawConfirmModal: !state.withdrawConfirmModal,
      total: data.total || '',
      withdrawDone: false,
    }));
  };

  const toggleSubmitModal = () => {
    setWithdrawSubmitModal((state) => !state);
    setWithdrawData((state) => ({ ...state, withdrawDone: true }));
  };

  const withdrawP2P = async (params: P2PWithdrawalParams, otpCode: string) => {
    try {
      await p2pWithdrawalMutate({
        params,
        cryptocurrency: currency.code.toLowerCase(),
        twoFACode: otpCode,
      });

      toggleSubmitModal();
    } catch (error) {}
  };

  const handleWithdraw = async () => {
    const { otpCode, amount, address, beneficiary, useVoucher } = withdrawData;

    if (isP2P) {
      await withdrawP2P({ amount, address, voucher: useVoucher }, otpCode);
    } else {
      const withdrawRequest = {
        amount,
        currency: currency.code.toLowerCase(),
        otp: otpCode,
        beneficiary_id: String(beneficiary.id),
      };

      dispatch(walletsWithdrawCcyFetch(withdrawRequest));
    }

    toggleConfirmModal();
    start(OTP_TIMEOUT);
  };

  const renderDropItem = (walletTypeValue: string) => {
    return t(walletTypeValue);
  };

  return (
    <>
      <div className={isMobileDevice ? 'cr-mobile-wallet-withdraw-body' : undefined}>
        <Box position="relative" spacing="3">
          <Box
            flex="1"
            as={SelectString}
            isSearchable={false}
            options={availableWalletTypes}
            value={walletType}
            onChange={setWalletType as any}
            placeholder={t('withdraw.from_balance')}
            label={t('withdraw.from_balance')}
            formatOptionLabel={renderDropItem}
          />

          {isP2P && (
            <WithdrawP2P
              currency={currency}
              withdrawDone={withdrawData.withdrawDone}
              countdown={countdown}
              onSubmit={toggleConfirmModal}
            />
          )}

          {wallet && isMarket && (
            <WithdrawMarket
              wallet={wallet}
              withdrawDone={withdrawData.withdrawDone}
              countdown={countdown}
              onSubmit={toggleConfirmModal}
            />
          )}
        </Box>

        {withdrawSubmitModal ? (
          <Modal2 show header={t('page.modal.withdraw.success')} onClose={toggleSubmitModal}>
            <Box as="span" textAlign="center">
              {t('page.modal.withdraw.success.message.content')}
            </Box>
            <Button onClick={toggleSubmitModal} color="primary">
              {t('page.modal.withdraw.success.button')}
            </Button>
          </Modal2>
        ) : null}

        {withdrawData.withdrawConfirmModal ? (
          <ModalWithdrawConfirmation
            show={withdrawData.withdrawConfirmModal}
            amount={withdrawData.total}
            currency={currency.code}
            precision={currency.minorUnit}
            rid={withdrawalAddress}
            onSubmit={handleWithdraw}
            onDismiss={toggleConfirmModal}
          />
        ) : null}
      </div>

      {walletType ? (
        <WalletHistory walletType={walletType} type="withdraws" general={general} />
      ) : null}
    </>
  );
};
