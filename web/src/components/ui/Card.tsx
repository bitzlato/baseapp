import { FC } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';

export const CardHeader: FC = ({ children }) => {
  const isMobileDevice = useIsMobileDevice();
  if (isMobileDevice) {
    return (
      <Box px="5x" pt="5x">
        <Text variant="label" fontWeight="strong">
          {children}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      py="4x"
      px="5x"
      borderBottomWidth="1x"
      borderBottomStyle="solid"
      borderBottomColor="cardHeaderBorderBottom"
    >
      {typeof children === 'string' ? <Text variant="title">{children}</Text> : children}
    </Box>
  );
};

export const CardBody: FC = ({ children }) => <Box p="5x">{children}</Box>;

export const Card: FC<BoxProps> = ({ children, ...rest }) => {
  const isMobileDevice = useIsMobileDevice();
  if (isMobileDevice) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <Box bg="block" borderRadius="1.5x" {...rest}>
      {children}
    </Box>
  );
};
