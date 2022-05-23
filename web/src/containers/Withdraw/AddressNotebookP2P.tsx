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

interface Props {
  currencyCode: string;
  inputAddress: string;
  error?: string | null;
  onChange: (value: string) => void;
}

export const AddressNotebookP2P = ({ inputAddress, currencyCode, error, onChange }: Props) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: addresses } = useFetchP2PNotebookAddresses({ cryptocurrency: currencyCode });
  const isLoading = addresses === undefined;
  const [p2pAddAddressToNotebook] = useP2PAddAddressToNotebook({ cryptocurrency: currencyCode });
  const [p2pDeleteAddressFromNotebook] = useP2PDeleteAddressFromNotebook({
    cryptocurrency: currencyCode,
  });

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
        inputAddress={inputAddress}
        addresses={addresses}
        isLoading={isLoading}
        selectedAddress={selectedAddress}
        error={error}
        preventClickOuside={addModalOpen}
        onAddClick={handleAddModalOpen}
        onDeleteClick={handleDeleteSubmit}
        onSelect={handleAddressSelect}
        onInputChange={handleAddressInputChange}
      />

      <AddressNotebookAddModal
        show={addModalOpen}
        currencyCode={currencyCode}
        onClose={handleAddModalClose}
        onSubmit={handleAddSubmit}
      />
    </>
  );
};
