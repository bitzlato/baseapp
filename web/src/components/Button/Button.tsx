import React, { FC, ComponentProps, JSXElementConstructor, ReactNode } from 'react';
import cn from 'classnames';

import s from './Button.postcss';

type JSXElement = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
type Props<C extends JSXElement, P = ComponentProps<C>> = P & {
  children: ReactNode;
  color?: 'primary' | 'secondary';
  component?: C;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
};

export const Button = <T extends JSXElement = 'button'>({
  children,
  color = 'primary',
  component = 'button',
  size = 'medium',
  fullWidth = false,
  ...props
}: Props<T>): ReturnType<FC<Props<T>>> => {
  const Component = component;
  const disabled =
    'disabled' in props && typeof props.disabled === 'boolean' ? props.disabled : false;

  return (
    <Component
      className={cn({
        [s.btn]: true,
        [s.btnPrimary]: color === 'primary',
        [s.btnSecondary]: color === 'secondary',
        [s.btnSmall]: size === 'small',
        [s.btnMedium]: size === 'medium',
        [s.btnLarge]: size === 'large',
        [s.btnDisabled]: disabled,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};
