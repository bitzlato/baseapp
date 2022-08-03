import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

interface Props {
  label: string;
}

export const ChatDisputeLabel: FC<Props> = ({ label }) => (
  <Box width="full" backgroundColor="tradeDisputeLabelBackground" py="4x" textAlign="center">
    <Box as="span" color="tradeDisputeLabelColor" fontSize="medium" fontWeight="strong">
      {label}
    </Box>
  </Box>
);
