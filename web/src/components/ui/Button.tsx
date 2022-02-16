import { ComponentProps, ElementType, FC } from 'react';
import { Box } from './Box';
import { button, ButtonVariants } from './Button.css';

type ButtonProps<C extends ElementType = 'button'> = NonNullable<ButtonVariants> & {
  as?: C | undefined;
  onClick?: (() => void) | undefined;
};

type Props<C extends ElementType = 'button'> = ButtonProps<C> &
  Omit<ComponentProps<C>, keyof ButtonProps>;

type ButtonComponent = <C extends ElementType = 'button'>(
  props: Props<C>,
) => ReturnType<FC<Props<C>>>;

export const Button = (({
  as = 'button' as const,
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  ...props
}: Props<'button'>) => {
  let type: Props<'button'>['type'] | undefined;
  if (as === 'button' && !('type' in props)) {
    type = 'button';
  }

  return (
    <Box
      as={as}
      type={type}
      {...props}
      className={button({ variant, color, size, disabled, fullWidth } as ButtonVariants)}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Box>
  );
}) as ButtonComponent;
