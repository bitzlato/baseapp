import { ChangeEvent } from 'react';
import { Box } from 'web/src/components/ui/Box';
import SearchIcon from 'web/src/assets/svg/SearchIcon.svg';
import * as s from './SearchInput.css';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, placeholder, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box position="relative">
      <Box
        autoFocus
        as="input"
        type="text"
        placeholder={placeholder}
        value={value}
        className={s.searchInput}
        py="4x"
        pl="5x"
        pr="12x"
        width="full"
        backgroundColor="transparent"
        color="text"
        onChange={handleChange}
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        display="flex"
        alignItems="center"
        height="full"
        pr="4x"
      >
        <SearchIcon fill="selectSearchInputPlaceholder" />
      </Box>
    </Box>
  );
};
