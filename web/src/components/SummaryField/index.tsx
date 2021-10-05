import cn from 'classnames';
import * as React from 'react';

export interface SummaryFieldProps {
  className?: string;
  message: string;
}

export const SummaryField: React.FC<SummaryFieldProps> = ({ message, className, children }) => {
  return (
    <div className={cn('cr-summary-field', className)}>
      <span className="cr-summary-field-message">{message}</span>
      <span className="cr-summary-field-content">{children}</span>
    </div>
  );
};
