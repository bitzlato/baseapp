import * as React from 'react';
import { Box } from '../Box';

export interface SummaryFieldProps {
  message: string;
}

export const SummaryField: React.FC<SummaryFieldProps> = ({ message, children }) => {
  return (
    <Box row spacing className="cr-summary-field">
      <span className="cr-summary-field-message">{message}</span>
      <span className="cr-summary-field-content">{children}</span>
    </Box>
  );
};
