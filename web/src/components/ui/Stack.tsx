import { Children, FC, ReactNode } from 'react';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { Box } from './Box';

interface Props {
  className?: string | undefined;
  children: ReactNode;
  display?: Sprinkles['display'] | undefined;
  direction?: Sprinkles['flexDirection'] | undefined;
  alignItems?: Sprinkles['alignItems'] | undefined;
  justifyContent?: Sprinkles['justifyContent'] | undefined;
  marginRight?: Sprinkles['marginRight'];
  marginBottom?: Sprinkles['marginBottom'];
}

export const Stack: FC<Props> = ({
  className,
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
      className={className}
      display="flex"
      flexDirection={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {stackItems.map((item, index) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
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
