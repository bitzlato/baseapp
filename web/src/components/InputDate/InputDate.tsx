import { useState } from 'react';
import Calendar from 'react-calendar';
import { Box } from 'web/src/components/ui/Box';
import { Dropdown } from 'web/src/components/Dropdown/Dropdown';
import { TextInput, TextInputProps } from 'web/src/components/TextInputCustom/TextInputCustom';
import { localeDate } from 'web/src/helpers';
import CalendarIcon from 'web/src/assets/svg/CalendarIcon.svg';
import * as s from './InputDate.css';

export interface InputDateProps extends TextInputProps {
  value: string;
}

export const InputDate = ({ value, placeholder, label, onChange }: InputDateProps) => {
  const [focused, setFocused] = useState(false);
  const dateValue = value ? new Date(value) : null;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const renderButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
    return (
      <Box position="relative">
        <TextInput
          className={s.input}
          type={value || focused ? 'date' : 'text'}
          placeholder={placeholder}
          label={label}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
        />

        <Box
          as="button"
          type="button"
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          display="flex"
          alignItems="center"
          px="5x"
          color={open ? 'calendarItemActiveBg' : 'text'}
          cursor="pointer"
          onClick={onClick}
        >
          <CalendarIcon />
        </Box>
      </Box>
    );
  };

  const renderMenu = ({ onClose }: { onClose: () => void }) => (
    <Calendar
      value={dateValue}
      onChange={(v: Date) => {
        onChange?.(localeDate(v, 'dateInput'));
        onClose();
      }}
    />
  );

  return <Dropdown size="medium" renderButton={renderButton} renderContent={renderMenu} />;
};
