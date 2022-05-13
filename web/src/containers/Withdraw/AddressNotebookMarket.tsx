import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from 'web/src/hooks/data/useFetch';
import { tradeUrl } from 'src/api/config';
import { defaultBeneficiary } from 'web/src/modules/user/beneficiaries/defaults';
import {
  beneficiariesCreateData,
  beneficiariesDelete,
  Beneficiary,
  memberLevelsFetch,
  selectBeneficiaries,
  selectBeneficiariesActivateSuccess,
  selectBeneficiariesCreate,
  selectBeneficiariesCreateSuccess,
  selectMemberLevels,
  selectUserInfo,
  sendError,
  beneficiariesResetState,
  selectBeneficiariesDeleteSuccess,
  Wallet,
  selectBeneficiariesFetchLoading,
} from 'web/src/modules';
import { BeneficiariesActivateModal } from 'web/src/containers/Withdraw/BeneficiariesActivateModal';
import { BeneficiariesAddModal } from 'web/src/containers/Withdraw/BeneficiariesAddModal';
import { BeneficiariesFailAddModal } from 'web/src/containers/Withdraw/BeneficiariesFailAddModal';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { AddressNotebook } from 'web/src/containers/Withdraw/AddressNotebook';

interface Props {
  wallet: Wallet;
  onChangeValue: (beneficiary: Beneficiary) => void;
}

const convertBeneficiaryToAddress = (blockchains: Blockchain[]) => (beneficiary: Beneficiary) => ({
  ...beneficiary,
  address: beneficiary.data.address,
  isPending: beneficiary.state.toLowerCase() === 'pending',
  blockchainName: blockchains.find((blockchain) => blockchain.id === beneficiary.blockchain_id)
    ?.name,
});

export const AddressNotebookMarket: FC<Props> = ({ wallet, onChangeValue }: Props) => {
  const dispatch = useDispatch();

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(defaultBeneficiary);
  const [isOpenAddressModal, setAddressModalState] = useState(false);
  const [isOpenConfirmationModal, setConfirmationModalState] = useState(false);
  const [isOpenFailModal, setFailModalState] = useState(false);

  const { data = [] } = useFetch<Blockchain[]>(`${tradeUrl()}/public/blockchains`);
  const currencyCode = wallet.currency.code;
  const blockchains = useMemo(
    () => data.filter((d) => wallet.blockchain_currencies.find((b) => b.blockchain_id === d.id)),
    [data, wallet.blockchain_currencies],
  );

  const beneficiaries = useSelector(selectBeneficiaries);
  const beneficiariesLoading = useSelector(selectBeneficiariesFetchLoading);
  const beneficiariesAddData = useSelector(selectBeneficiariesCreate);
  const beneficiariesAddSuccess = useSelector(selectBeneficiariesCreateSuccess);
  const beneficiariesActivateSuccess = useSelector(selectBeneficiariesActivateSuccess);
  const beneficiariesDeleteSuccess = useSelector(selectBeneficiariesDeleteSuccess);
  const memberLevels = useSelector(selectMemberLevels);
  const userData = useSelector(selectUserInfo);

  const handleSetCurrentAddress = useCallback(
    (item: Beneficiary) => {
      if (item.data) {
        setSelectedBeneficiary(item);
        onChangeValue(item);
      }
    },
    [onChangeValue],
  );

  const handleFilterByState = useCallback(
    (beneficiariesList: Beneficiary[], filter: string | string[]) => {
      if (beneficiariesList.length) {
        return beneficiariesList.filter((item) => filter.includes(item.state?.toLowerCase() ?? ''));
      }

      return [];
    },
    [],
  );

  const handleSetCurrentAddressOnUpdate = (beneficiariesList: Beneficiary[]) => {
    let filteredByState = handleFilterByState(beneficiariesList, 'active');

    if (!filteredByState.length) {
      filteredByState = handleFilterByState(beneficiariesList, 'pending');
    }

    if (filteredByState.length >= 1 && filteredByState[0]) {
      handleSetCurrentAddress(filteredByState[0]);
    } else {
      handleSetCurrentAddress(defaultBeneficiary);
    }
  };

  useEffect(() => {
    if (!memberLevels) {
      dispatch(memberLevelsFetch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currencyCode || beneficiariesDeleteSuccess) {
      dispatch(beneficiariesResetState());
    }
  }, [dispatch, currencyCode, beneficiariesDeleteSuccess]);

  useEffect(() => {
    if (beneficiaries) {
      handleSetCurrentAddressOnUpdate(beneficiaries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beneficiaries]);

  useEffect(() => {
    if (beneficiariesAddSuccess) {
      setAddressModalState(false);
      setConfirmationModalState(true);
    }
  }, [beneficiariesAddSuccess]);

  useEffect(() => {
    if (beneficiariesActivateSuccess) {
      setConfirmationModalState(false);
    }
  }, [beneficiariesActivateSuccess]);

  const beneficiariesAsAddresses = useMemo(
    () =>
      handleFilterByState(beneficiaries, ['active', 'pending']).map(
        convertBeneficiaryToAddress(blockchains),
      ),
    [handleFilterByState, beneficiaries, blockchains],
  );

  const selectedBeneficiaryAsAddress = useMemo(() => {
    return convertBeneficiaryToAddress(blockchains)(selectedBeneficiary);
  }, [selectedBeneficiary, blockchains]);

  const handleDeleteAddress = useCallback(
    (item: Beneficiary) => {
      dispatch(beneficiariesDelete({ id: item.id }));
    },
    [dispatch],
  );

  const handleSelectAddressClick = useCallback(
    (item: Beneficiary) => {
      if (item.state && item.state.toLowerCase() === 'pending') {
        dispatch(beneficiariesCreateData(item));
        setConfirmationModalState(true);
      } else {
        handleSetCurrentAddress(item);
      }
    },
    [dispatch, handleSetCurrentAddress],
  );

  const handleAddAddressClick = useCallback(() => {
    if (memberLevels && userData.level < memberLevels.withdraw.minimum_level) {
      setFailModalState(true);
    } else if (beneficiaries && beneficiaries.length >= 10) {
      dispatch(
        sendError({
          error: { message: ['error.beneficiaries.max10.addresses'] },
          processingType: 'alert',
        }),
      );
    } else {
      setAddressModalState(true);
    }
  }, [dispatch, memberLevels, userData.level, beneficiaries]);

  return (
    <>
      <AddressNotebook
        inputReadonly
        addresses={beneficiariesAsAddresses}
        isLoading={beneficiariesLoading && beneficiariesAsAddresses.length === 0}
        selectedAddress={selectedBeneficiaryAsAddress}
        inputAddress={selectedBeneficiary.data.address}
        preventClickOuside={isOpenAddressModal || isOpenConfirmationModal || isOpenFailModal}
        onAddClick={handleAddAddressClick}
        onDeleteClick={handleDeleteAddress}
        onSelect={handleSelectAddressClick}
      />

      <BeneficiariesAddModal
        show={isOpenAddressModal}
        currencyCode={currencyCode}
        blockchains={blockchains}
        onClose={() => setAddressModalState(false)}
      />

      <BeneficiariesActivateModal
        show={isOpenConfirmationModal}
        beneficiariesAddData={beneficiariesAddData}
        handleToggleConfirmationModal={() => setConfirmationModalState(false)}
      />

      <BeneficiariesFailAddModal
        show={isOpenFailModal}
        handleToggleFailModal={() => setFailModalState(false)}
      />
    </>
  );
};
