import classnames from 'classnames';
import * as React from 'react';

export interface SummaryFieldProps {
  /**
   * Additional class name for styling. By default element receives `cr-input` class
   * @default empty
   */
  className?: string;
  /**
   * The string to use as the label for the SummaryField.
   */
  message: string;
}

/**
 * Component to display currency amount with specific label.
 */
export const SummaryField: React.FC<SummaryFieldProps> = ({ message, className, children }) => {
  const cx = classnames('cr-summary-field', 'cr-row-spacing', className);

  return (
    <div className={cx}>
      <span className="cr-summary-field-message">{message}</span>
      <span className="cr-summary-field-content">{children}</span>
    </div>
  );
};
