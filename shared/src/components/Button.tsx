import { FC } from 'react';
import { Box } from './Box';
import * as s from './Button.css';

interface Props extends NonNullable<s.ButtonVariants> {
  id?: string;
  onClick?: (() => void) | undefined;
}

export const Button: FC<Props> = ({ children, id, onClick, ...props }) => {
  return (
    <Box as="button" className={s.button(props)} type="button" id={id} onClick={onClick}>
      {children}
    </Box>
  );
};
