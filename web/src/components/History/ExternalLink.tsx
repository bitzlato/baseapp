import * as React from 'react';

interface Props {
    href: string;
}

export const ExternalLink: React.FC<Props> = props => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
    </a>
);
