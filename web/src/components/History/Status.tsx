import * as React from 'react';

interface Props {
    type: 'success' | 'failed' | 'pending';
    style?: React.CSSProperties;
}

export const Status: React.FC<Props> = props => (
    <span className={`cr-mobile-history-table--${props.type}`} style={props.style}>
        {props.children}
    </span>
);
