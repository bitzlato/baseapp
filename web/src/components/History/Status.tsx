import classnames from 'classnames';
import * as React from 'react';

interface Props {
  type: 'success' | 'failed' | 'pending';
  className?: string;
  style?: React.CSSProperties;
}

export const Status: React.FC<Props> = (props) => (
  <span
    className={classnames(`cr-mobile-history-table--${props.type}`, props.className)}
    style={props.style}
  >
    {props.children}
  </span>
);
