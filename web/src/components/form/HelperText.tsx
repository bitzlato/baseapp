import { FC } from 'react';
import { Text, TextProps } from 'web/src/components/ui/Text';

interface Props extends Omit<TextProps<'div'>, 'as'> {}

export const HelperText: FC<Props> = (props) => (
  <Text as="div" variant="caption" color="textMuted" {...props} />
);
