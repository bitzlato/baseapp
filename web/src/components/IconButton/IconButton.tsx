import React from 'react';
import cn from 'classnames';
import s from './IconButton.postcss';

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn('cr-percentage-button', s.iconButton, className)}
      type="button"
      {...props}
    />
  );
};
