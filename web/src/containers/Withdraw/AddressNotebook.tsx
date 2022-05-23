import { useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { TextInput } from 'web/src/components/Input/TextInput';
import { useT } from 'web/src/hooks/useT';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { PlusIcon } from 'web/src/assets/images/PlusIcon';
import { Blockchain } from 'web/src/modules/public/blockchains/types';
import { Spinner } from 'web/src/components/ui/Spinner';
import { AddressNotebookItem } from 'web/src/containers/Withdraw/AddressNotebookItem';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import * as s from './AddressNotebook.css';

type CommonAddressNotebook = {
  id: number;
  address: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  isPending?: boolean | undefined;
  blockchainName?: Blockchain['name'] | undefined;
};

interface Props<T extends CommonAddressNotebook> {
  inputReadonly?: boolean;
  inputAddress: string | undefined;
  addresses: Array<T> | undefined;
  isLoading?: boolean;
  selectedAddress?: T | undefined;
  error?: string | null | undefined;
  preventClickOuside?: boolean;
  onAddClick: () => void;
  onDeleteClick: (item: T) => void;
  onSelect: (item: T) => void;
  onInputChange?: (value: string) => void;
}

const noop = () => {};

export const AddressNotebook = <T extends CommonAddressNotebook>({
  inputReadonly = false,
  inputAddress,
  addresses,
  isLoading = false,
  selectedAddress,
  error,
  preventClickOuside = false,
  onAddClick,
  onDeleteClick,
  onSelect,
  onInputChange = noop,
}: Props<T>) => {
  const t = useT();
  const elementRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const isEmpty = addresses && addresses.length === 0;

  const handleOnOutsideClick = useCallback(() => {
    if (preventClickOuside) {
      return;
    }

    if (open) {
      setOpen(false);
    }
  }, [preventClickOuside, open]);

  useOnClickOutside(elementRef, handleOnOutsideClick);
  useEscapeKeyDown(handleOnOutsideClick);

  const handleDropdownToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  const handleAddressDelete = async (id: CommonAddressNotebook['id']) => {
    const item = addresses?.find((address) => address.id === id);
    if (!item) {
      return;
    }

    onDeleteClick(item);
  };

  const handleAddressSelect = (id: CommonAddressNotebook['id']) => {
    const item = addresses?.find((address) => address.id === id);
    if (!item) {
      return;
    }

    onSelect(item);
    setOpen(false);
  };

  return (
    <Box ref={elementRef} position="relative">
      <TextInput
        readOnly={inputReadonly}
        inputClassName={s.input}
        label={t('page.body.wallets.beneficiaries.title')}
        value={inputAddress}
        error={error}
        onChange={onInputChange}
        onClick={inputReadonly ? handleDropdownToggle : undefined}
      />

      <Box className={s.inputRightControls} display="flex" alignItems="center">
        {selectedAddress?.isPending ? (
          <Tooltip label={t('page.body.wallets.beneficiaries.dropdown.pending')} placement="top">
            <Box
              as="span"
              display="inline-block"
              flexShrink={0}
              mb={{ mobile: '1x', desktop: '0' }}
              mr={{ mobile: '0', desktop: '1x' }}
            >
              <WarningIcon />
            </Box>
          </Tooltip>
        ) : null}

        <Box
          as="button"
          type="button"
          display="flex"
          alignItems="center"
          height="full"
          pl="3x"
          pr="1.5x"
          color="selectColor"
          onClick={handleDropdownToggle}
        >
          <ChevronDownIcon className={cn(s.chevron, open && s.chevronOpened)} />
        </Box>
      </Box>

      <Box
        className={cn(s.dropdown, open && s.dropdownOpened)}
        display="flex"
        flexDirection="column"
        backgroundColor="addressDropdownBg"
        borderRadius="2x"
        fontSize="medium"
        boxShadow="dropdown"
        pb={isEmpty ? '6x' : undefined}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" p="6x">
            <Spinner />
          </Box>
        ) : null}

        {!isLoading && isEmpty ? (
          <Box as="p" mt="8x" mb="5x" textAlign="center" width="full">
            {t('withdraw.addresses_empty', { br: <br /> })}
          </Box>
        ) : null}

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

        {!isLoading && !isEmpty ? (
          <Box
            borderTopWidth="1x"
            borderTopStyle="solid"
            borderColor="addressDropdownDelimeter"
            pt="3x"
          >
            {addresses?.map((item) => (
              <AddressNotebookItem
                key={item.id}
                id={item.id}
                address={item.address}
                description={item.name || item.description}
                blockchainName={item.blockchainName}
                isSelected={selectedAddress?.id === item.id}
                isPending={item.isPending}
                onSelect={handleAddressSelect}
                onDelete={handleAddressDelete}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
