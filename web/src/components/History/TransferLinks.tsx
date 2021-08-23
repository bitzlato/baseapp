import * as React from 'react';

import { TransferLink } from '../../modules/user/history';
import { ExternalLink } from './ExternalLink';

interface Props {
    links: TransferLink[];
}

export const TransferLinks: React.FC<Props> = props => (
    <div className="cr-row-spacing">
        {props.links.map(d => (
            <ExternalLink key={d.title} href={d.url}>
                {d.title}
            </ExternalLink>
        ))}
    </div>
);
