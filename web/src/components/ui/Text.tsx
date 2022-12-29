import { ComponentProps, ElementType, FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { Box } from 'web/src/components/ui/Box';
import { OptionalWithUndefined } from 'web/src/types';
import { text, TextVariants } from './Text.css';

interface Props<C extends ElementType = 'p'>
  extends NonNullable<TextVariants>,
    OptionalWithUndefined<
      Pick<
        Sprinkles,
        | 'fontFamily'
        | 'fontSize'
        | 'fontWeight'
        | 'fontStyle'
        | 'fontSize'
        | 'textAlign'
        | 'textTransform'
        | 'whiteSpace'
        | 'color'
        | 'lineHeight'
        | 'textOverflow'
        | 'wordBreak'
      >
    > {
  as?: C | undefined;
  className?: string | undefined;
  title?: string | undefined;
}

export type TextProps<C extends ElementType = 'p'> = Props<C> &
  Omit<ComponentProps<C>, keyof Props>;

type TextComponent = <C extends ElementType = 'p'>(
  props: PropsWithChildren<TextProps<C>>,
) => ReturnType<FC<TextProps<C>>>;

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  lead: 'p',
  title: 'h6',
  label: 'span',
  body: 'p',
  caption: 'p',
} as const;

export const Text: TextComponent = ({
  as,
  className,
  children,
  variant = 'body',
  gutterBottom = false,
  color = 'text',
  ...props
}) => {
  return (
    <Box
      as={(as ?? variantMapping[variant]) as any} // FIXME: remove any
      className={cn(text({ variant, gutterBottom }), className)}
      color={color}
      {...props}
    >
      {children}
    </Box>
  );
};
