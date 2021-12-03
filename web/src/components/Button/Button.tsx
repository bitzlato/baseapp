import React, { FC, ComponentProps, JSXElementConstructor, ReactNode } from 'react';
import cn from 'classnames';

import s from './Button.postcss';

type JSXElement = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
type Props<C extends JSXElement, P = ComponentProps<C>> = P & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';
  component?: C;
  size?: 'small' | 'large';
  fullWidth?: boolean;
  revertLightPrimary?: boolean;
};

export const Button = <T extends JSXElement = 'button'>({
  children,
  variant = 'primary',
  component = 'button',
  size,
  fullWidth = false,
  revertLightPrimary,
  className,
  ...props
}: Props<T>): ReturnType<FC<Props<T>>> => {
  const Component = component;
  const disabled =
    'disabled' in props && typeof props.disabled === 'boolean' ? props.disabled : false;

  return (
    <Component
      className={cn(
        {
          [s.btn]: true,
          [s.btnPrimary]: variant === 'primary',
          [s.btnSecondary]: variant === 'secondary',
          [s.btnPrimaryOutline]: variant === 'primary-outline',
          [s.btnSecondaryOutline]: variant === 'secondary-outline',
          [s.btnRevertLightPrimary]: revertLightPrimary,
          [s.btnSmall]: size === 'small',
          [s.btnLarge]: size === 'large',
          [s.btnDisabled]: disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
