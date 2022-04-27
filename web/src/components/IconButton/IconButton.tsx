import React from 'react';
import cn from 'classnames';
import s from './IconButton.postcss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  noFill?: boolean;
  size?: 'small' | 'icon' | undefined;
  color?: 'primary' | undefined;
}

export const IconButton: React.FC<Props> = ({ className, noFill, size, color, ...props }) => {
  return (
    <button
      className={cn(
        s.iconButton,
        noFill && s.iconButtonNoFill,
        size === 'small' && s.iconButtonSmall,
        color === 'primary' && s.iconButtonPrimary,
        className,
      )}
      type="button"
      {...props}
    />
  );
};
