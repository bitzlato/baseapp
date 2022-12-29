import { FC } from 'react';
import { Text, TextProps } from 'web/src/components/ui/Text';

interface Props extends Omit<TextProps<'label'>, 'as'> {}

export const Label: FC<Props> = (props) => <Text as="label" variant="h6" {...props} />;
