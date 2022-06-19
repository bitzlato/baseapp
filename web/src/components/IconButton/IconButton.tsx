import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import s from './IconButton.postcss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  noFill?: boolean;
  size?: 'small' | 'icon' | undefined;
  color?: 'primary' | undefined;
}

export const IconButton = forwardRef(
  ({ className, noFill, size, color, ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
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
  },
);

IconButton.displayName = 'IconButton';
