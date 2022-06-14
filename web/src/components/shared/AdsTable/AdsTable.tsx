import { FC, ReactNode } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Stack } from 'web/src/components/ui/Stack';

export const AdsTableHeader: FC = ({ children }) => (
  <Box display="flex" alignItems="center" pb="5x">
    {children}
  </Box>
);

export const AdsTableBody: FC = ({ children }) => (
  <Stack direction="column" marginBottom="4x">
    {children}
  </Stack>
);

interface AdsTableRowProps extends BoxProps<'div'> {}

export const AdsTableRow: FC<AdsTableRowProps> = ({ children, onClick, ...restProps }) => (
  <Box
    display="flex"
    alignItems="center"
    py="4x"
    backgroundColor="adBg"
    borderRadius="1.5x"
    position="relative"
    overflow="hidden"
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Box>
);

interface Props {
  header: ReactNode;
  emptyContent?: ReactNode | undefined;
  isLoading: boolean;
}

export const AdsTable: FC<Props> = ({ children, header, emptyContent, isLoading }) => {
  let body;
  if (isLoading) {
    body = (
      <Box display="flex" justifyContent="center" py="20x">
        <Spinner />
      </Box>
    );
  } else if (children) {
    body = children;
  } else {
    body = emptyContent;
  }

  return (
    <Box fontSize="medium" color="text" mb="5x">
      {header}
      {body}
    </Box>
  );
};
