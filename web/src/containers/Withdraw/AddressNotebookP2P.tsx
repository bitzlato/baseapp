import { useMemo, useState } from 'react';
import { useFetchP2PNotebookAddresses } from 'web/src/hooks/data/useFetchP2PNotebookAddresses';
import {
  AddNotebookAddressValues,
  AddressNotebookAddModal,
} from 'web/src/containers/Withdraw/AddressNotebookAddModal';
import { NotebookAddress } from 'web/src/modules/p2p/notebook';
import { useP2PAddAddressToNotebook } from 'web/src/hooks/mutations/useP2PAddAddressToNotebook';
import { useP2PDeleteAddressFromNotebook } from 'web/src/hooks/mutations/useP2PDeleteAddressFromNotebook';
import { AddressNotebook } from 'web/src/containers/Withdraw/AddressNotebook';
import { useFetchP2PWalletStat } from 'web/src/hooks/data/useFetchP2PWallets';

interface Props {
  blockchainId?: number | undefined;
  validatorKey?: string | undefined;
  currencyCode: string;
  inputAddress: string;
  error?: string | null;
  onChange: (value: string) => void;
}

export const AddressNotebookP2P = ({
  blockchainId,
  validatorKey,
  inputAddress,
  currencyCode,
  error,
  onChange,
}: Props) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: p2pWalletsStat } = useFetchP2PWalletStat();
  const walletStat = p2pWalletsStat?.find((wallet) => wallet.code === currencyCode);
  const { data: notebookAddresses } = useFetchP2PNotebookAddresses({
    cryptocurrency: currencyCode,
    blockchainId,
  });
  const isLoading = notebookAddresses === undefined;
  const [p2pAddAddressToNotebook] = useP2PAddAddressToNotebook({
    cryptocurrency: currencyCode,
    blockchainId,
  });
  const [p2pDeleteAddressFromNotebook] = useP2PDeleteAddressFromNotebook({
    cryptocurrency: currencyCode,
  });

  const addresses = useMemo(
    () =>
      notebookAddresses?.map((address) => ({
        ...address,
        blockchainName: walletStat?.blockchains?.find(
          (blockchain) => blockchain.id === address.blockchainId,
        )?.name,
      })),
    [notebookAddresses, walletStat?.blockchains],
  );

  const selectedAddress = useMemo(
    () => addresses?.find(({ address }) => address === inputAddress),
    [inputAddress, addresses],
  );

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddSubmit = async (values: AddNotebookAddressValues) => {
    await p2pAddAddressToNotebook({
      cryptocurrency: currencyCode,
      address: values.address,
      description: values.name,
      blockchainId: values.blockchainId,
    });

    handleAddModalClose();
  };

  const handleDeleteSubmit = async (item: NotebookAddress) => {
    await p2pDeleteAddressFromNotebook(item.id);

    if (item.id === selectedAddress?.id) {
      onChange('');
    }
  };

  const handleAddressSelect = (item: NotebookAddress) => {
    onChange(item.address);
  };

  const handleAddressInputChange = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <AddressNotebook
        error={error}
        addresses={addresses}
        isLoading={isLoading}
        selectedAddress={selectedAddress}
        inputAddress={inputAddress}
        preventClickOuside={addModalOpen}
        onAddClick={handleAddModalOpen}
        onDeleteClick={handleDeleteSubmit}
        onSelect={handleAddressSelect}
        onInputChange={handleAddressInputChange}
      />

      <AddressNotebookAddModal
        show={addModalOpen}
        currencyCode={currencyCode}
        blockchainId={blockchainId}
        validatorKey={validatorKey}
        onClose={handleAddModalClose}
        onSubmit={handleAddSubmit}
      />
    </>
  );
};
