import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

interface Props {
  label: string;
}

export const ChatDisputeDivider: FC<Props> = ({ label }) => {
  const redLine = <Box backgroundColor="tradeDisputeDivider" w="full" h="0.5x" />;

  return (
    <Box height="10x" display="flex" alignItems="center">
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        {redLine}
      </Box>
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        <Box as="span" fontSize="medium" color="tradeDisputeDivider">
          {label}
        </Box>
      </Box>
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        {redLine}
      </Box>
    </Box>
  );
};
