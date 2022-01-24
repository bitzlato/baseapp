import { Children, FC, ReactNode } from 'react';
import { Sprinkles } from 'theme/sprinkles.css';
import { Box } from './Box';

interface Props {
  children: ReactNode;
  display?: Sprinkles['display'] | undefined;
  direction?: Sprinkles['flexDirection'] | undefined;
  alignItems?: Sprinkles['alignItems'] | undefined;
  justifyContent?: Sprinkles['justifyContent'] | undefined;
  marginRight?: Sprinkles['marginRight'];
  marginBottom?: Sprinkles['marginBottom'];
}

export const Stack: FC<Props> = ({
  children,
  display,
  direction,
  alignItems,
  justifyContent,
  marginRight,
  marginBottom,
}) => {
  const stackItems = Children.toArray(children);

  return (
    <Box
      display="flex"
      flexDirection={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {stackItems.map((item, index) => (
        <Box
          key={index}
          display={display}
          marginBottom={index !== stackItems.length - 1 ? marginBottom : undefined}
          marginRight={index !== stackItems.length - 1 ? marginRight : undefined}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};
