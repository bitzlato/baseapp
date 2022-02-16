import { FC, ComponentProps, ElementType } from 'react';
import { selectCurrentColorTheme } from 'web/src/modules';
import { useSelector } from 'react-redux';
import { Button as ButtonBase } from 'web/src/components/ui/Button';

type ButtonBaseProps = ComponentProps<typeof ButtonBase>;
type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';
type ButtonProps<C extends ElementType = 'button'> = Omit<ButtonBaseProps, 'variant' | 'as'> & {
  variant?: ButtonVariant;
  component?: C | undefined;
  revertLightPrimary?: boolean | undefined;
};

type Props<C extends ElementType = 'button'> = ButtonProps<C> &
  Omit<ComponentProps<C>, keyof ButtonProps>;

type ButtonComponent = <C extends ElementType = 'button'>(
  props: Props<C>,
) => ReturnType<FC<Props<C>>>;

const variantMap: Record<ButtonVariant, ButtonBaseProps> = {
  primary: {
    color: 'primary',
  },
  secondary: {
    color: 'secondary',
  },
  'primary-outline': {
    variant: 'outlined',
    color: 'primary',
  },
  'secondary-outline': {
    variant: 'outlined',
    color: 'secondary',
  },
};

/**
 * @deprecated Use web/src/components/ui/Button
 */
export const Button: ButtonComponent = ({
  variant = 'primary',
  component = 'button' as const,
  revertLightPrimary = false,
  ...props
}) => {
  const theme = useSelector(selectCurrentColorTheme);
  let sharedProps = variantMap[variant];
  if (revertLightPrimary && theme === 'light') {
    if (sharedProps.color === 'primary') {
      sharedProps.color = 'secondary';
    }
  }

  return <ButtonBase as={component} {...props} {...sharedProps} />;
};
