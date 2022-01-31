import * as React from 'react';
import { Box } from '../Box';

export interface SummaryFieldProps {
  message: string;
}

export const SummaryField: React.FC<SummaryFieldProps> = ({ message, children }) => {
  return (
    <Box row spacing justify="between" textColor="primary">
      <span>{message}:</span>
      <Box textAlign="end" as="span">
        {children}
      </Box>
    </Box>
  );
};
