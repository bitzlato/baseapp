import { FC, useState } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import EyeIcon from 'web/src/assets/svg/EyeIcon.svg';
import EyeOffIcon from 'web/src/assets/svg/EyeOffIcon.svg';
import { TextInput, TextInputProps } from './TextInput';
import s from './PasswordInput.postcss';

export const PasswordInput: FC<TextInputProps> = ({ className, type, ...rest }) => {
  const [isPassword, setIsPassword] = useState(true);

  const handleToggle = () => {
    setIsPassword(!isPassword);
  };

  return (
    <Box position="relative" className={className}>
      <TextInput
        className={s.passwordInputNumber}
        type={isPassword ? 'password' : 'text'}
        {...rest}
      />
      <IconButton
        className={s.passwordInputCurrency}
        onClick={handleToggle}
        aria-label="toggle password visibility"
        noFill
      >
        {isPassword ? <EyeIcon /> : <EyeOffIcon />}
      </IconButton>
    </Box>
  );
};
