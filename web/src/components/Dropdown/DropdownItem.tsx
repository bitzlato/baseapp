import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

interface Props {
  isSelected?: boolean;
  onClick: () => void;
}

export const DropdownItem: FC<Props> = ({ children, isSelected = false, onClick }) => {
  return (
    <Box
      as="button"
      color="text"
      py="2x"
      px="5x"
      width="full"
      textAlign="left"
      fontWeight="strong"
      backgroundColor={{
        default: isSelected ? 'selectDropdownItemSelectedBg' : 'transparent',
        hover: isSelected ? 'selectDropdownItemSelectedBg' : 'selectDropdownItemHoverBg',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
