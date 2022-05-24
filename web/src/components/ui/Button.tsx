import {
  ComponentProps,
  ElementType,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Box, BoxProps } from './Box';
import { button, ButtonVariants } from './Button.css';

type ButtonProps<C extends ElementType = 'button'> = NonNullable<ButtonVariants> & {
  as?: C | undefined;
  onClick?: (() => void) | undefined;
};

type Props<C extends ElementType = 'button'> = ButtonProps<C> &
  Omit<ComponentProps<C>, keyof ButtonProps> &
  Omit<BoxProps<C>, keyof ButtonProps>;

interface ButtonComponent {
  <C extends ElementType = 'button'>(props: PropsWithChildren<Props<C>>): ReactElement<
    any,
    any
  > | null;
  displayName?: string | undefined;
}

export const Button = forwardRef(
  (
    {
      as = 'button' as const,
      children,
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      active = false,
      disabled = false,
      fullWidth = false,
      onClick,
      ...props
    }: Props<'button'>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    let type: Props<'button'>['type'] | undefined;
    if (as === 'button' && !('type' in props)) {
      type = 'button';
    }

    return (
      <Box
        as={as}
        ref={ref}
        type={type}
        {...props}
        className={button({ variant, color, size, active, disabled, fullWidth } as ButtonVariants)}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
      >
        {children}
      </Box>
    );
  },
) as ButtonComponent;

Button.displayName = 'Button';
