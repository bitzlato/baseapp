import { Box } from 'web/src/components/ui/Box';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { PlusIcon } from 'web/src/assets/images/PlusIcon';
import { useT } from 'web/src/hooks/useT';

interface AddressNotebook {
  id: number;
  address: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  isPending?: boolean | undefined;
  blockchainName?: Blockchain['name'] | undefined;
}

interface Props<T extends AddressNotebook> {
  addresses?: ReadonlyArray<T> | undefined;
  isLoading?: boolean;
  onAddClick: () => void;
  onDeleteClick: (item: T) => void;
}

export const AddressNotebook = <T extends AddressNotebook>({
  addresses,
  isLoading,
  onAddClick,
  onDeleteClick,
}: Props<T>) => {
  const t = useT();
  const isEmpty = !addresses || addresses.length === 0;

  const addButton = (
    <Box
      as="button"
      py="4x"
      color="addressDropdownAddText"
      backgroundColor={{ hover: 'addressDropdownAddHoverBg' }}
      onClick={onAddClick}
    >
      <PlusIcon fillColor="currentColor" />
      <Box as="span" ml="2x" fontWeight="strong">
        {t('withdraw.addresses_add')}
      </Box>
    </Box>
  );

  const body = 'sdsd';

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="addressDropdownBg"
      borderRadius="2x"
      fontSize="medium"
      boxShadow="dropdown"
      pb={isEmpty ? '6x' : undefined}
    >
      {body}
    </Box>
  );
};
