import { ElementType, FC } from 'react';
import { Sprinkles } from 'shared/src/theme/sprinkles.css';
import { Text } from 'shared/src/components/Text';

interface Props {
  as?: ElementType | undefined;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: Sprinkles['textAlign'] | undefined;
}

export const Heading: FC<Props> = ({ as, children, level, textAlign }) => {
  return (
    <Text as={as} variant={`h${level}`} textAlign={textAlign} gutterBottom>
      {children}
    </Text>
  );
};
