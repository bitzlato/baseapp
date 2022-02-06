import { FC, ComponentProps, ReactNode, ElementType } from 'react';
import cn from 'classnames';

import s from './Button.postcss';

type ButtonProps<C extends ElementType = 'button'> = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';
  component?: C;
  size?: 'small' | 'large';
  fullWidth?: boolean;
  revertLightPrimary?: boolean;
};

type Props<C extends ElementType = 'button'> = ButtonProps<C> &
  Omit<ComponentProps<C>, keyof ButtonProps>;

type ButtonComponent = <C extends ElementType = 'button'>(
  props: Props<C>,
) => ReturnType<FC<Props<C>>>;

export const Button: ButtonComponent = ({
  children,
  variant = 'primary',
  component = 'button' as const,
  size,
  fullWidth = false,
  revertLightPrimary,
  className,
  ...props
}) => {
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
