import React from 'react';
import cn from 'classnames';
import s from './Text.postcss';

interface Props {
  size?: '2x';
}

export const Text: React.FC<Props> = ({ size, children }) => {
  return (
    <span className={cn(size === '2x' && s.text2X)}>{children}</span>
  );
};
