import { FC, forwardRef, memo, useCallback, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import EyeIcon from 'web/src/assets/svg/EyeIcon.svg';
import EyeOffIcon from 'web/src/assets/svg/EyeOffIcon.svg';
import { InputProps } from './Input';
import { InputWithAddon } from './InputWithAddon';

export interface Props extends Omit<InputProps, 'type'> {}

export const InputPassword: FC<Props> = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleClick = useCallback(() => {
      setIsShowPassword((prev) => !prev);
    }, []);
    const toggle = (
      <Box
        as="button"
        type="button"
        color={{ default: 'textMuted', hover: 'text' }}
        p="2x"
        onClick={handleClick}
        aria-label="toggle password visibility"
      >
        {isShowPassword ? (
          <Box as={EyeOffIcon} display="block" />
        ) : (
          <Box as={EyeIcon} display="block" />
        )}
      </Box>
    );

    return (
      <InputWithAddon
        {...props}
        ref={ref}
        type={isShowPassword ? 'text' : 'password'}
        rightAddon={toggle}
      />
    );
  }),
);

InputPassword.displayName = 'InputPassword';
