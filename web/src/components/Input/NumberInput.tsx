import { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { TextInput, TextInputProps } from './TextInput';
import s from './TextInput.postcss';

export const NumberInput: FC<TextInputProps> = ({ className, ...rest }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);
  if (isMobileDevice) {
    rest.type = 'number';
  }
  return <TextInput {...rest} className={cn(s.textInputNumber, className)} />;
};
