import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Dropdown } from 'web/src/components/Dropdown/Dropdown';
import { TextInput } from 'web/src/components/Input/TextInput';
import { PaymethodInfo } from 'web/src/modules/p2p/types';
import { SelectCustomItem } from 'web/src/components/SelectCustom/SelectCustomItem';
import * as s from './SelectPaymentMethod.css';

interface Props {
  options: PaymethodInfo[];
  value: PaymethodInfo | null;
  onChange: (value: PaymethodInfo) => void;
}

export const SelectPaymentMethod = ({ options, value, onChange }: Props) => {
  const t = useSharedT();

  return (
    <Dropdown
      renderButton={({ open, onClick }) => (
        <Box position="relative" cursor="pointer" onClick={onClick}>
          <Box
            readOnly
            inputClassName={s.input}
            as={TextInput}
            label={t('Payment method')}
            value={value?.description}
          />
          <Box className={s.inputRightControls}>
            <Box as="button" type="button" pl="2x" pr="3x" py="1.5x" color="selectButtonText">
              ≥
            </Box>
          </Box>
        </Box>
      )}
      renderContent={({ onClose }) => (
        <Box flexGrow={1} pt="2x" overflowY="auto">
          {options.length > 0 ? (
            options?.map((option) => (
              <SelectCustomItem
                key={option.id}
                isSelected={option.id === value?.id}
                onClick={() => {
                  onChange(option);
                  onClose();
                }}
              >
                {option.description}
              </SelectCustomItem>
            ))
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="full"
              color="text"
            >
              {t('Nothing found')}
            </Box>
          )}
        </Box>
      )}
    />
  );
};
