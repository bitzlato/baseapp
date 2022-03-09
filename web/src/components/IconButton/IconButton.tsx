import React from 'react';
import cn from 'classnames';
import s from './IconButton.postcss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  noFill?: boolean;
}

export const IconButton: React.FC<Props> = ({ className, noFill, ...props }) => {
  return (
    <button
      className={cn(s.iconButton, noFill && s.iconButtonNoFill, className)}
      type="button"
      {...props}
    />
  );
};
