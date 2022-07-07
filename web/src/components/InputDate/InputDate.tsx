import DatePicker, { DatePickerProps } from 'react-date-picker/dist/entry.nostyle';
import { Box } from 'web/src/components/ui/Box';
import { TextInputProps } from 'web/src/components/TextInputCustom/TextInputCustom';
import CalendarIcon from 'web/src/assets/svg/CalendarIcon.svg';
import * as inputS from 'web/src/components/TextInputCustom/TextInputCustom.css';
import * as s from './InputDate.css';

export interface InputDateProps extends Pick<TextInputProps, 'label'>, DatePickerProps {}

export const InputDate = ({
  label,
  value,
  minDate,
  maxDate,
  dayPlaceholder = '--',
  monthPlaceholder = '--',
  yearPlaceholder = '--',
  onChange,
}: InputDateProps) => {
  return (
    <Box as="label" className={inputS.inputContainer}>
      <DatePicker
        className={s.input}
        value={value}
        showLeadingZeros
        format="dd.MM.y"
        dayPlaceholder={dayPlaceholder}
        monthPlaceholder={monthPlaceholder}
        yearPlaceholder={yearPlaceholder}
        calendarIcon={<CalendarIcon />}
        openCalendarOnFocus={false}
        clearIcon={null}
        minDate={minDate}
        maxDate={maxDate}
        isOpen={false}
        onChange={onChange}
      />
      <Box as="span" className={inputS.label}>
        {label}
      </Box>
    </Box>
  );
};
