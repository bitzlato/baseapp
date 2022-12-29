import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { TextProps } from 'web/src/components/ui/Text';
import { FieldContext } from './Field';

interface Props extends Omit<TextProps<'div'>, 'as'> {}

export const ErrorMessage: FC<Props> = (props) => {
  const { isInvalid } = useContext(FieldContext);
  if (!isInvalid) {
    return null;
  }

  return <Box as="div" variant="caption" color="danger" {...props} />;
};
