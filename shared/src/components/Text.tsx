import { ElementType, FC } from 'react';
import cn from 'classnames';
import { Sprinkles } from 'shared/src/theme/sprinkles.css';
import { Box } from 'shared/src/components/Box';
import { OptionalWithUndefined } from 'shared/src/types';
import { text, TextVariants } from './Text.css';

interface Props
  extends NonNullable<TextVariants>,
    OptionalWithUndefined<
      Pick<
        Sprinkles,
        | 'fontFamily'
        | 'fontWeight'
        | 'textAlign'
        | 'textTransform'
        | 'whiteSpace'
        | 'color'
        | 'lineHeight'
      >
    > {
  as?: ElementType | undefined;
  className?: string | undefined;
}

const variantMapping: Record<NonNullable<Props['variant']>, keyof JSX.IntrinsicElements> = {
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
};

export const Text: FC<Props> = ({
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
      as={as ?? variantMapping[variant]}
      className={cn(text({ variant, gutterBottom }), className)}
      color={color}
      {...props}
    >
      {children}
    </Box>
  );
};